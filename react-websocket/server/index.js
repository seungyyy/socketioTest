const express = require('express');
const http = require('http');
const app = express();
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://locallost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on("connect", (socket) => {
  socket.on("join_room", (data) => { 
    socket.join(data)
  })
  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

})

server.listen(5000, () => { 
  console.log('server is running')
})

