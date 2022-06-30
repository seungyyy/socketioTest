import React from 'react'
import { useNavigate } from 'react-router-dom';

const Main = ({ socket, username, room, getUserName, getRoomData }) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      navigate('/chat');
    }
  };

  return (
    <>
      <h3>Join A Chat</h3>
      <input
        type="text"
        laceholder="User"
        onChange={(e) => {
          getUserName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room Id..."
        onChange={(e) => {
          getRoomData(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join A Room</button>
    </>
  );
};

export default Main;