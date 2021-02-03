const express = require('express');
const socketio = require('socket.io');
const redis = require('./redis');

const app = express();
const server = app.listen(8000, () => console.log('Server started'));
const io = socketio(server);

app.use(express.static('static'));

const errorEmit = (socket) => {
  return (err) => {
    console.log(err);
    socket.broadcast.emit('user.events', 'Something went wrong!');
  };
};

io.on('connection', (socket) => {
  socket.broadcast.emit('user.events', 'Someone has joined');
  socket.on('name', (name) => {
    redis.storeUser(socket.id, name)
      .then(() => {
        console.log(`${name} says Hello!`);
        socket.broadcast.emit('name', name);
      }, errorEmit(socket));
  });

  socket.on('disconnect', () => {
    redis.getUser(socket.id)
      .then((user) => {
        if (user === null) return 'Someone';
        else return user;
      })
      .then((user) => {
        console.log(`${user} left`);
        socket.broadcast.emit('user.events', `${user} left`);
      }, errorEmit(socket));
  });
});
