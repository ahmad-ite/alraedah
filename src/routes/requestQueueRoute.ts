import express from "express";
import logger from "../logger/logger";
import Producer from "../rabbitmq/Producer";
import config from "../config/config";

const { RequestOrder } = require("../models/request");
const router = express.Router();

/**
 * @swagger
 * /api/v1/requests/register:
 *   post:
 *     description: register the request and will notify you when it will be ready
 *     tags: [QueueRequest]
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  payload:
 *                      $ref: '#/components/schemas/Input'
 *               required:
 *                 - payload
 *     responses:
 *       202:
 *         description: Register the request with status {pending}
 *       400:
 *         description: Invalid Input
 *       500:
 *         description: Server Error
 *
 * components:
 *  schemas:
 *     Input:
 *       title: query input
 *       type: object
 *       properties:
 *         list1:
 *           type: array
 *           items:
 *               type:integer
 *           description: array of numbers
 *       required:
 *         - list1
 */
router.post(
  "/requests/register",
  async (req: express.Request, res: express.Response) => {
    // here I use fcm token to know the user device, In real system we can know the user and fcm token by user oauth token
    const { payload } = req.body;

    // validate payload
    if (!payload) res.status(400).send("Invalid Input");

    // generate uniqe number for the request, Also we can us id of row in requests table

    try {
      const order = await RequestOrder.create({
        status: "pending",
        userId: "test-user",
        updatedAt: new Date(),
      });
      const requestId: string = order._id.toString();
      const producer = Producer.create(config.RABBIT_MQ_URL!!);
      const delayInMills = 10000;
      producer.sendDelayedMessageToQueue(
        config.QUEUE_NAME,
        delayInMills,
        JSON.stringify({ requestId, payload })
      );
      return res.status(202).json({ status: "pending", requestId: requestId });
    } catch (error) {
      logger.logError("ERROR", JSON.stringify(error));
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @swagger
 * /api/v1/requests/{requestId}:
 *   get:
 *     description: fetch request status with the results
 *     tags: [QueueRequest]
 *     parameters:
 *      - in : path
 *        name : requestId
 *        schema :
 *          type : string
 *        required : true
 *        description : Id of the request
 *     responses:
 *       202:
 *         description: Register the request with status {pending}
 *       400:
 *         description: Invalid Input
 *       500:
 *         description: Server Error
 *
 */
router.get(
  "/requests/:requestId",
  async (req: express.Request, res: express.Response) => {
    try {
      const requestId: string = req.params.requestId;
      const order = await RequestOrder.findById(requestId);
      if (!order) res.status(400).send("Invalid Input");
      if (order.status == "pending") {
        return res
          .status(200)
          .json({ status: "pending", message: "please wait a short time" });
      }

      return res.status(200).json({ status: "ready", data: order.data });
    } catch (error) {
      logger.logError("ERROR", JSON.stringify(error));
      return res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
