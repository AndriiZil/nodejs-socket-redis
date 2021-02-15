const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = app.listen(8001, () => console.log('Server started'));
const io = socketio(server);

app.use(express.static('static'));

const namespaceHandler = (namespace) => {
  return (socket) => {
    socket.emit('event', `You joined ${namespace.name}`);
    socket.on('event', data => {
      socket.broadcast.emit('event', data);
    });
  };
}

const one = io.of('/namespace1');
const two = io.of('/namespace2');

one.on('connection', namespaceHandler(one));
two.on('connection', namespaceHandler(two));
