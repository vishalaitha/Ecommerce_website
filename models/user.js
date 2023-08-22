import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cart: {
    type: Array,
  },
});

// create product schema

const User = mongoose.model("User", UserSchema);
export default User;
