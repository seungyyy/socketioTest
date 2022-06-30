import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Container, Divider, Grid, List, Paper, Typography, ListItem, ListItemText, TextField, FormControl, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { ChatMessageDto } from '../../model/ChatMessageDto';
import './chat.css';
import SendIcon from "@mui/icons-material/Send"

const Chat = ({ socket, username, room }) => {
  const [chatMessages, setChatMessages] = useState([
  ]);

  const [message, setMessage] = useState("")



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
    }
  }

  useEffect(() => { 
    socket.on("receive_message", (data) => { 
      console.log(data)
    })
  },[socket])

  const listChatMessages = chatMessages.map((chat, idx) => { 
    return (
      <ListItem key={idx}>
        <ListItemText primary={`${chat.user}: ${chat.message}`} />
      </ListItem>
    );
  })

  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <Box p={3}>
            <Typography variant="h4">Live Chat</Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid id="chat-window" xs={12} item>
                <List id="chat-window-messages">{listChatMessages}</List>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    value={message}
                    onChange={handleMsaChange}
                    label="Type your message..."
                    variant="outlined"
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

export default Chat;
