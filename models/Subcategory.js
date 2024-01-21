import { Schema, model, models } from "mongoose";

const subcategorySchema = new Schema({
  name: {
    type: String,
  },
});

const SubcategoryModel =
  models.Subcategory || model("Subcategory", subcategorySchema);

export default SubcategoryModel;
