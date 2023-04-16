const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

class Model {
  constructor() {
    this.conversations = [];
  }
}

let model = new Model();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const users = []; 

io.on('connection', (socket) => {
  socket.on('user_join', (data) => {
    socket.username = data;
    // here check in DB with sender, receiver if record not exist then create
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
    const a = {
      sender: data.senderId,
      receiver: data.receiverId,
      type: 'TEXT',
      message: data.message,
    };
    let msg = {message: data, username: socket.username, date: new Date().toLocaleString()}
    model.conversations.push(a);
    socket.broadcast.emit('chat_message', msg);
  });

  socket.on('disconnect', (data) => {
    socket.broadcast.emit('user_leave', socket.username);
  });

  // socket.on('old_message', async (data) => {
  //   const messageList = await model.conversations.findAll({
  //     where: {
  //       sender: data.senderId,
  //       receiver: data.receiverId,
  //     },
  //   });
  //   socket.broadcast.emit('getList', messageList);
  // });
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), (req, res) => {
  const { filename } = req.file;
  io.emit('image', { username: req.body.username, filename });
  res.send('Image uploaded successfully!');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});