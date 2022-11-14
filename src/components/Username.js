import React, { useRef } from 'react'

function Username({ socket, setState }) {

  const ref = useRef()

  const send = () => {
    socket.emit('setName', ref.current.value)
    setState(true)
  }

  return (
    <div className='username'>
      <input ref={ref} type="text" placeholder='enter your username' />
      <button onClick={send}>enter</button>
    </div>
  )
}

export default Username