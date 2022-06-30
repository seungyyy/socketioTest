import React, { Fragment, useState, useEffect } from 'react';
import { Container, Divider, Grid, List, Paper, Typography, TextField, FormControl, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import './chat.css';
import SendIcon from "@mui/icons-material/Send";
import styled from 'styled-components';

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("")
  const [chatList, setChatList] = useState([]);

  const handleMsaChange = (e) => { 
    setMessage(e.target.value)
  }
  
  const sendMessage = async () => {
    if (message !== "") { 
      const messageData = {
        room: room,
        author: username,
        message: message,
        time: new Date().getHours() + ":" + new Date().getMinutes()
      }

      await socket.emit("send_message", messageData)
      setChatList((list) => [...list, messageData]);
      setMessage("");
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChatList((list) => [...list, data]);
    });
  }, [socket]);


  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <Box p={3}>
            <Typography variant="h4">Live Chat - {room}</Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid id="chat-window" mt={2} xs={12} item>
                <List id="chat-window-messages">
                  {chatList.map((chat, idx) => {
                    return (
                      <Li key={idx} className={username === chat.author ? 'chat-right-List' : ''}>
                        {username !== chat.author && <span>{chat.author}</span>}
                        <p className={username !== chat.author ? 'chat-other' : ''}>
                          {chat.message}
                        </p>
                        <span className="chat-time">{chat.time}</span>
                      </Li>
                    );
                  })}
                </List>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    value={message}
                    onChange={handleMsaChange}
                    label="Type your message..."
                    variant="outlined"
                    onKeyPress={(event) => {
                      event.key === 'Enter' && sendMessage();
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid xs={1} item>
                <IconButton aria-label="send" color="primary" onClick={sendMessage}>
                  <SendIcon />
                </IconButton>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};

const Li = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  p {
    display: inline-block;
    background-color: #90caf9;
    padding: 5px;
    margin: 0 8px 0;
    border-radius: 10%;
    color: #25333f;
  }
  .chat-other {
    background: #f2f2f2f2;
  }
  .chat-time {
    align-self: flex-end;
    vertical-align: middle;
    font-size: 12px;
  }
`;

export default Chat;
