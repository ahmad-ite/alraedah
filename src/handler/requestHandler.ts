import helper from "./../helper/helper";
const { RequestOrder } = require("../models/request");

class RequestHandler {
  execute = async (msg: string) => {
    const message = JSON.parse(msg);
    const { payload, requestId } = message;

    let result: { [key: string]: boolean } = {};
    Object.keys(message.payload).forEach((key: string) => {
      let arr: number[] = payload[key];
      let visited: boolean[] = [];
      let index = 0;
      let counter = 0;

      let length = arr.length;
      result[key] = helper.perfectCycle(arr, visited, index, counter, length);
    });

    const order=await RequestOrder.findOneAndUpdate(
      { _id: requestId },
      { status:"ready",data: result, updatedAt: new Date() },
      { upsert: true }
    );
    helper.notify(order.userId, { status: "ready", requestId: requestId });
  };
}

export default new RequestHandler();
