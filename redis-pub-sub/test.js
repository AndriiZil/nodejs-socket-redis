const redis = require('redis');

const subscriber = redis.createClient();
const publisher = redis.createClient();

publisher.publish('channel', 'a message');

subscriber.on('message', function(channel, message) {
  console.log("Subscriber received message in channel '" + channel + "': " + message);
});

subscriber.subscribe('channel');
