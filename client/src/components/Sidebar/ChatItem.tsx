'use client'
import { useSelectedUser } from '@/store/userStore'
import { userProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const ChatItem = ({user}: {user: userProps}) => {
    const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
  function handleClick(e: any){
    document.querySelector(".messages")?.classList.remove("hidden");
    document.querySelector(".messages")?.classList.add("flex");
    document.querySelector(".sidebar")?.classList.add("hidden");
    document.querySelector(".selected-user")?.classList.remove('selected-user');
    e.currentTarget.classList.add('selected-user');
    setSelectedUser(user);
  }
  return (
    <>
        <li onClick={handleClick} className='flex gap-3 cursor-pointer hover:bg-slate-300 p-5 rounded-lg'>
            <div className='avatar'>
                <div className='w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1'>
                    <Image
                        src={`/robohash/${user.imageId}.png`}
                        alt='user avatar'
                        height={256}
                        width={256}
                    />
                </div>
            </div>
            <div className='flex flex-col justify-between ml-2'>
                <h3 className='font-semibold text-black text-lg'>{user?.name}</h3>
                <p className='text-[#707991]'>user has joined</p>
            </div>
        </li>
        <div className='divider my-0'></div>
    </>
  )
}

export default ChatItem