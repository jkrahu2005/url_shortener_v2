const { createClient } = require("redis");

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'light-robin-quicksand-46326.db.redis.io',
        port: 17452
    }
});


redisClient.on("connect", () => {
    console.log("✅ Redis Connected");
});

redisClient.on("error", (err) => {
    console.error("❌ Redis Error:", err.message);
});

module.exports = redisClient;