import { Message } from "amqplib/callback_api";
import express from "express";
import Producer from "./rabbitmq/Producer";
import Consumer from "./rabbitmq/Consumer";

import config from "./config/config";
import requestHandler from "./handler/requestHandler";
import swaggerMiddleware from "./swagger/swagger";

const requestRoute = require("./routes/requestRoute");
const requestQueueRoute = require("./routes/requestQueueRoute");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = config.PORT;

const producer = Producer.create(config.RABBIT_MQ_URL!!);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api-docs", swaggerMiddleware.ui, swaggerMiddleware.doc);
app.use("/api-docs.json", (req: express.Request, res: express.Response) => {
  res.send(swaggerMiddleware.swaggerSpecification);
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`Welcome, Application is running at ${PORT}\n`);
});

app.use("/api/v1", requestRoute);
app.use("/api/v1", requestQueueRoute);
requestQueueRoute
const consume = async () => {
  const queueName = config.QUEUE_NAME;
  const consumer: Consumer = Consumer.create(config.RABBIT_MQ_URL!!);
  consumer.consume(queueName, (msg) => {
    requestHandler.execute(msg);
  });

  Consumer.create(config.RABBIT_MQ_URL!!).consume(queueName, (msg) => {
    requestHandler.execute(msg);
  });
};

consume();

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });
    app.listen(PORT, () => {
      console.log(`App running on port http://localhost:${PORT}`);
      console.log(
        `OpenAPI documentation available in http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.env.NODE_ENV != "test") {
  start();
}
