import React from 'react'
import { useNavigate } from 'react-router-dom';
 import styled from 'styled-components';

const Main = ({ socket, username, room, getUserName, getRoomData }) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      navigate('/chat');
    }
  };

  return (
    <Container>
      <h3>Join A Chat</h3>
      <input
        type="text"
        laceholder="User"
        className="input-user"
        placeholder="User Name..."
        onChange={(e) => {
          getUserName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room Id..."
        className="input-room"
        onChange={(e) => {
          getRoomData(e.target.value);
        }}
      />
      <button onClick={joinRoom} className="button-join">
        Join A Room
      </button>
    </Container>
  );
};

const Container = styled.article`
  height: 100vh;
  width: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .input-room {
    margin: 15px 0;
    padding: 10px;
    box-sizing: border-box;
  }
  .input-user {
    padding: 10px;
    box-sizing: border-box;
  }
  .button-join {
    width: 100%;
    padding: 10px;
    border: none;
    box-sizing: border-box;
    background: #1976D2;
    color: white;
    cursor: pointer;
  }
`;

export default Main;