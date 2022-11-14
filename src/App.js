import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './components/Chat';
import Username from './components/Username';

const socket = io.connect('http://localhost:4001')

function App() {

  const [state, setState] = useState(false);
  const [messages, setMessages] = useState([])


  useEffect(() => {

    socket.on("allMessages", data => {
      console.log(data)
      setMessages(data)
    })

  }, [])

  return (
    <div className="App">
      {state ? <Chat socket={socket} messages={messages} setMessages={setMessages} /> : <Username socket={socket} setState={setState} />}

    </div>
  );
}

export default App;
