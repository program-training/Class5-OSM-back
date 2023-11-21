import mongoose, { Schema, InferSchemaType, Model } from "mongoose";
export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minLength: 5,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});
export const User = mongoose.model("user", UserSchema);
