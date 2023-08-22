import mongoose from "mongoose";

const order = new mongoose.Schema({
  username: {
    type: String,
  },
  items: {
    type: Array,
  },
});

// create product schema

const Order = mongoose.model("Order", order);
export default Order;
