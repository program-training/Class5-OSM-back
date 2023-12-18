import mongoose, { Schema } from "mongoose";
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
  isadmin: {
    type: Boolean,
    required: true,
  },
});
export const User = mongoose.model("user", UserSchema);
