const Redis = require("ioredis");
const redis = new Redis({
  port: 13817, // Redis port
  host: "redis-13817.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

module.exports = redis;
