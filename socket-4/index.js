const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = app.listen(8000, () => console.log('Server started'));
const io = socketio(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  socket.broadcast.emit('user.events', 'Someone has joined');
  socket.on('name', (name) => {
    console.log(`${name} says Hello!`);
    socket.broadcast.emit('name', name);
  });
});
