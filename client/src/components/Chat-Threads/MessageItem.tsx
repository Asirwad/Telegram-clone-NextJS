import React from 'react'

const MessageItem = ({user, message}: {user: boolean, message: string|undefined}) => {
  console.log(message);
  return (
    <div className={`chat ${user ? "chat-end": "chat-start"}`}>
        <div className={`chat-bubble ${user ? "chat-bubble": "chat-bubble-primary"}`}>
            {message}
        </div>
    </div>
  )
}

export default MessageItem