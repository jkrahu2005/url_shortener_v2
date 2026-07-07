require("dotenv").config();

const app = require("./src/app");

const { connect } = require("./src/utils/db");
const redisClient = require("./src/utils/redisClient");




const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connect();

        await redisClient.connect();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });


    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

startServer();