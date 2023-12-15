const redis = require('redis');

// Create a single Redis client when the app starts
const createRedisClient = () => {
  const client = redis.createClient({
    socket: {
      host: 'localhost',
      port: 6379,
    },
  });
  client.on('error', (err) => console.error('Redis Client Error', err));
  client.connect();

  return client;
};

module.exports = createRedisClient;
