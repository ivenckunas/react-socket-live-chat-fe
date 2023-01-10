import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({ socket, username, room }) {

  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      };
      await socket.emit('sendMessage', messageData);
      setMessageList((list) => [...list, messageData])
      setCurrentMessage('')
    }
  }

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  return (
    <div>
      <div className="chat-header">
        <p>Live chat</p>
        <small>Room name: <b>{room}</b> </small>
        <br />
        <small>logged in as: <b>{username}</b></small>
      </div>
      <ScrollToBottom className='chat-body'>
        <div className='chat-messages' >
          {messageList.map((msg, i) => (
            <div
              id={username === msg.author ? 'you' : 'other'}
              className='chat-message'
              key={i}>
              <p><b>{msg.author}:</b> {msg.message}</p>
              <small>{msg.time}</small>
            </div>
          ))}
        </div>
      </ScrollToBottom>
      <div className="chat-footer">
        <input
          value={currentMessage}
          onChange={(e) => { setCurrentMessage(e.target.value) }}
          onKeyDown={(e) => { e.key === 'Enter' && sendMessage() }}
          type="text" placeholder='enter your message...' />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  )
}

export default Chat