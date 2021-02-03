const express = require('express');
const redis = require('redis');

const app = express();

const redisClient = redis.createClient();
const publishClient = redis.createClient();

redisClient.on('message', (channel, message) => {
  console.log('CHANNEL', channel);
  console.log('MESSAGE', message);
});

app.get('/', (req, res) => {
  console.log('GET');
  publishClient.publish('REQUESTS', `request on ${req.socket.localPort} for ${req.url}`);
  console.log(`Local log for ${req.url}`);
  res.end();
});

app.listen(process.argv[2], () => {
  console.log('Server was started');
});
