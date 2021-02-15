const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = app.listen(8000, () => console.log('Server started'));
const io = socketio(server);

app.use(express.static('static'));

const namespace = io.of('/namespace');

namespace.on('connection', (socket) => {
  namespace.emit('event', 'Connected to namespace');
  // this is a different namespace
  io.emit('event', 'Normal');
});
