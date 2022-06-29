import React, { Fragment, useState } from 'react';
import { Container, Divider, Grid, List, Paper, Typography, ListItem, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import { ChatMessageDto } from '../../model/ChatMessageDto';
import './chat.css';

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([
    new ChatMessageDto('John', 'Hi')
  ]);

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
            <Typography variant="h4">
              happy Chatting
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid id="chat-window" xs={12} item>
                <List id="chat-window-messages">
                  {listChatMessages}
                </List>
              </Grid>
              <Grid item></Grid>
              <Grid item></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Chat;
