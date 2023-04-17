const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const users = []; 

io.on('connection', (socket) => {
  socket.on('user_join', (data) => {
    socket.username = data;

    users.push({
      socketId: socket.id,
      userId: data,
    });
    socket.broadcast.emit('user_join', data);
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', socket.username);
  });

  socket.on('stoppedTyping', () => {
    socket.broadcast.emit('stoppedTyping');
  });

  socket.on('chat_message', async (data) => {
    let msg = {message: data, username: socket.username, date: new Date().toLocaleString()}
    socket.broadcast.emit('chat_message', msg);
  });

  socket.on('photo_message', async (data) => {
    let msg = {message: data,username: socket.username, date: new Date().toLocaleString()};
    socket.broadcast.emit('photo_message', msg);
    
  });

  socket.on('disconnect', (data) => {
    socket.broadcast.emit('user_leave', socket.username);
  });

});


server.listen(3000, () => {
  console.log('listening on *:3000');
});