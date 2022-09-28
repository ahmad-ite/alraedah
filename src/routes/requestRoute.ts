import express from "express";
import logger from "../logger/logger";
import helper from "../helper/helper";
const router = express.Router();

/**
 * @swagger
 * /api/v1/requests/execute:
 *   post:
 *     description: Execute the request and get the result directly
 *     tags: [Request]
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  payload:
 *                      $ref: '#/components/schemas/Input'
 *
 *               required:
 *                 - payload
 *     responses:
 *       200:
 *         description: return the result directly
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
  "/requests/execute",
  async (req: express.Request, res: express.Response) => {
    const { payload } = req.body;
    try {
      // validate payload
      if (!payload) return res.status(400).send("Invalid Input");

      let result: { [key: string]: boolean } = {};
      Object.keys(payload).forEach((key: string) => {
        let arr: number[] = payload[key];
        let visited: boolean[] = [];
        let index = 0;
        let counter = 0;

        let length = arr.length;
        result[key] = helper.perfectCycle(arr, visited, index, counter, length);
      });
      return res.send(result);
    } catch (error) {
      logger.logError("ERROR", JSON.stringify(error));
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
