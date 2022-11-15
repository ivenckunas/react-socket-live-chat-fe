import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username === '' || room === '') return
    socket.emit("joinRoom", room);
    setShowChat(true)
  };

  return (
    <div className="App container">
      {showChat ?
        <Chat socket={socket} username={username} room={room} />
        :
        <div className="join-chat">
          <h3>Join chat</h3>

          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="your name..."
          />
          <input
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            type="text"
            placeholder="room name..."
          />
          <button onClick={() => {

            joinRoom()
          }}>Join</button>
        </div>
      }
    </div>
  );
}

export default App;
