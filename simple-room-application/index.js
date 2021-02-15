const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = app.listen(8000, () => console.log('Server started'));
const io = socketio(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  socket.on('room.join', room => {
    Array.from(socket.rooms).filter(r => r !== socket.id).forEach(r => socket.leave(r));

    setTimeout(() => {
      socket.join(room);
      socket.emit('event', `Joined room ${room}`);
      socket.broadcast.to(room).emit('event', `Someone joined room ${room}`);
    }, 0);
  })

  socket.on('event', e => {
    socket.broadcast.to(e.room).emit('event',  `${e.name} says hello!`);
  });
});
