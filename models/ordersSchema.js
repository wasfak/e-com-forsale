import mongoose, { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderItemSchema = new Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item", // Replace with your Item model name
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: () => uuidv4(),
      unique: true,
      required: true,
    },
    orderItems: [orderItemSchema], // Updated to use the orderItemSchema
    isPaid: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "pending",
    },
    userName: { type: String, default: "" },
    userMail: { type: String, default: "" },
    total: {
      type: Number,
    },
  },
  { timestamps: true }
);

const OrderModel = models.Order || model("Order", orderSchema);

export default OrderModel;
