const { Pool } = require("pg");

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function connect() {
    try {

        const client = await db.connect();

        console.log("✅ PostgreSQL Connected");

        client.release();

    } catch (err) {

        console.error("❌ Database Connection Failed");

        console.error(err.message);

        process.exit(1);
    }
}

module.exports = {
    db,
    connect,
};