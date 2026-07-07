require("dotenv").config();

const serverless = require("serverless-http");

const app = require("../src/app");

const { connect } = require("../src/utils/db");
const redisClient = require("../src/utils/redisClient");

let initialized = false;

async function initialize() {
  if (initialized) return;

  await connect();

  // if (!redisClient.isOpen) {
  //   await redisClient.connect();
  // }

  initialized = true;
}

module.exports = async (req, res) => {
  await initialize();

  return serverless(app)(req, res);
};