import { Schema, model, models } from "mongoose";

// Define the item schema
const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    itemId: {
      type: String,
    },
    categories: [
      {
        type: String,

        default: "",
      },
    ],
    subcategories: [
      {
        type: String,

        default: "",
      },
    ],
    soldUnits: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 1,
    },
    details: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    published: {
      type: String,
      default: "published",
    },
    imageUrl: {
      type: String,
      default: "", // You may want to set a default image URL or handle this differently
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed", "none"],
      default: "none", // You may want to handle this differently based on your needs
    },
    discountPercentage: {
      type: Number,
      default: null, // You may want to handle this differently based on your needs
    },
    discountAmount: {
      type: Number,
      default: null, // You may want to handle this differently based on your needs
    },
    priceAfterSale: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Set up a pre-save hook to update priceAfterSale before saving to the database
itemSchema.pre("save", function (next) {
  if (this.isOnSale) {
    if (
      this.discountType === "percentage" &&
      this.discountPercentage !== null
    ) {
      // Calculate price after percentage discount
      this.priceAfterSale =
        this.price - (this.price * this.discountPercentage) / 100;
    } else if (this.discountType === "fixed" && this.discountAmount !== null) {
      // Calculate price after fixed amount discount
      this.priceAfterSale = this.price - this.discountAmount;
    }
  } else {
    this.priceAfterSale = this.price; // No sale, priceAfterSale is the same as the original price
  }
  next();
});

// Create the Item model
const ItemModel = models.Item || model("Item", itemSchema);

export default ItemModel;
