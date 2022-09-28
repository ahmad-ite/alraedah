const dotenv = require("dotenv");

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  IS_CLUSTER_MODE_ENABLED: process.env.PORT || false,
  RABBIT_MQ_URL: process.env.RABBIT_MQ_URL,
  APP_NAME: "AlRaida",
  VERSION: "1.0.0",
  QUEUE_NAME:process.env.QUEUE_NAME || 'test-queue'
};
