const express = require('express');
const redis = require('redis');

const app = express();

const redisClient = redis.createClient();
redisClient.set('REDIS_KEY', '0');

app.get('/', (req, res) => {
  redisClient.incr('REDIS_KEY');
  redisClient.get('REDIS_KEY', (err, reply) => {
    res.send(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Title</title>
      </head>
      <body>
        <h2>Redis count: ${reply}</h2>
      </body>
    </html>`);
    res.end();
  })
});

app.listen(8000, () => {
  console.log('Server was started');
});
