import mongoose, { Schema, InferSchemaType, Model } from "mongoose";
export const CategorySchema = new Schema({
  category_name: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});
export const Category = mongoose.model("category", CategorySchema);
