const mongoose = require("mongoose");

const RequestOrderSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default:"pending"
  },
  userId: {
    type: String,
    required: true
  },

  data: {
    type: Map,
  
  },
  updatedAt: { type: Date, default: Date.now },
});

const RequestOrder = mongoose.model("RequestOrder", RequestOrderSchema);

module.exports = { RequestOrder };
