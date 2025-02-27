import { userProps } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export async function handleSubmit(e:any, router: AppRouterInstance, avatarId: number, socket: any) {
    e.preventDefault();
    try {
        await fetch("/auth", {
            method: 'POST',
            body: JSON.stringify({
                name: e.target[0].value,
                email: e.target[1].value,
                imageId: avatarId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        socket.emit("joined", "new user");
        router.push("/chat");
    } catch (error) {
        console.log(error);
    }
}


export async function fetchUser(cookie: { user?: any; },setUser: { (user: any): void; (arg0: any): void; }) {
    const accessToken = cookie.user;
    const response = await fetch("/user", {
      method: "GET",
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    const user = await response.json();
    setUser(user[0]);
}


export async function fetchUsers(mySelf: userProps, setUsers: any){
    const data = await fetch("/users");
    const users = await data.json();
    setUsers(users.filter((user:any) => user.email !== mySelf.email));
}


export async function fetchMessages(sender: any, reciver: any, setMessages: any){
    if(sender && reciver){
        try {
            const res = await fetch(`/messages?sender=${sender?.email}&reciver=${reciver?.email}`);
            const data = await res?.json();
            setMessages(data);
        } catch (error) {
            console.log(error);
            setMessages(null);
        }
    }
}