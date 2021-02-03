const { createClient } = require('redis');

const client = createClient();

const promiser = (resolve, reject) => {
  return (err, data) => {
    if (err) reject(err);
    resolve(data);
  };
};

const storeUser = (socketId, user) => {
  return new Promise((resolve, reject) => {
    client.setex(socketId, '3600000', user, promiser(resolve, reject));
  });
};

const getUser = (socketId) => {
  return new Promise((resolve, reject) => {
    client.get(socketId, promiser(resolve, reject));
    // Error test
    // client.get(socketId, 12345, promiser(resolve, reject));
  });
};

module.exports.storeUser = storeUser;
module.exports.getUser = getUser;
module.exports.client = client;
