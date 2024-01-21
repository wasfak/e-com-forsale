import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: [String],
  },
  userId: {
    type: String,
  },
});

const CategoryModel = models.Category || model("Category", categorySchema);

export default CategoryModel;
