import React, { useEffect, useRef } from 'react'

function Chat({ socket, messages }) {

  const ref = useRef()

  useEffect(() => {
    socket.emit('messageHistory')
  }, [])

  const send = () => {
    socket.emit('setMessages', ref.current.value)
  }

  return (
    <div className='chat'>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <p key={i}><b>{msg.username}</b>: {msg.message}</p>
        )
        )}
      </div>

      <div className="send-message">
        <input ref={ref} type="text" placeholder='enter your message' />
        <button onClick={send}>send</button>
      </div>
    </div>
  )
}

export default Chat