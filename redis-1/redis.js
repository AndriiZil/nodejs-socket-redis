const { createClient } = require('redis');

const client = createClient();

const get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  });
};

const hgetall = (key) => {
  return new Promise((resolve, reject) => {
    if (key === null) reject();
    client.hgetall(key, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const lrange = (key) => {
  return new Promise((resolve, reject) => {
    client.lrange(key, [0, -1], (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

module.exports.get = get;
module.exports.hgetall = hgetall;
module.exports.lrange = lrange;
module.exports.client = client;
