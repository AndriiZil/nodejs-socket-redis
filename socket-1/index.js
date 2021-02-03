const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = app.listen(8000, () => console.log('Server started'));
const io = socketio(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  console.log('A socket is now open');
  console.log(socket);
});
