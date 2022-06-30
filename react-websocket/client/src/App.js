import Bar from "./components/bar/Bar";
import { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Main from "./components/Main";
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const getUserName = (name) => { 
    setUsername(name)
  }

  const getRoomData = (room) => {
    setRoom(room);
  };

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                socket={socket}
                username={username}
                room={room}
                getUserName={getUserName}
                getRoomData={getRoomData}
              />
            }
          ></Route>
          <Route
            path="/chat"
            element={
              <>
                <Bar />
                <Chat socket={socket} username={username} room={room} />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
