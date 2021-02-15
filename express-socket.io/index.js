const express = require('express');
const session = require('express-session');
const socketio = require('socket.io');

const app = express();
const server = app.listen(8080, () => console.log('Server started'));
const io = socketio(server);

const sessionModdleware = session({
  secret: 'good secret',
  resave: false,
  saveUninitialized: true,
});

app.use(sessionModdleware);
app.use((req, res, next) => {
  console.log(`From Express ${req.session.name}`);
  next();
});
app.use(express.static('static'));

io.use((socket, next) => {sessionModdleware(socket.request, {}, next)});

io.on('connection', socket => {
  if (socket.request.session.name) {
    socket.emit('name', socket.request.session.name);
    io.emit('event', `${socket.request.session.name} has joined.`);
  }

  socket.on('name', name => {
    socket.request.session.name = name;
    socket.broadcast.emit('event', `${name} says hello!`);
  });
});
