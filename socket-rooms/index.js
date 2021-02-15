const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = app.listen(8000, () => console.log('Server started'));
const io = socketio(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  console.log('connection');
  const now = Date.now();

  if ((now % 2) === 0) {
    socket.join('even');
  } else {
    socket.join('odd');
  }

  io.to('even').emit('event', `Even Room ${now}`);
  io.to('odd').emit('event', `Odd Room ${now}`);
  setTimeout(() => {
    io.to('even').emit('event', `Even Room`);
    io.to('odd').emit('event', `Odd Room`);
  }, 5000)
});
