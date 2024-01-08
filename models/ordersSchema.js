import mongoose, { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";
// User schema
const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: () => uuidv4(), // Automatically generate a UUID for each new document
      unique: true, // Ensure the id is unique within the collection
      required: true,
    },

    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item", // Replace with your OrderItem model name
      },
    ],
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
  },
  { timestamps: true }
);

// Create the model from the schema
const OrderModel = models.Order || model("Order", orderSchema);

export default OrderModel;
