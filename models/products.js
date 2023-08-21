import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    unique:true,
  },
  productPrice: {
    type: Number,
  },
  productId:{
    type:Number,
  }
});


// create product schema


const Product = mongoose.model("Product", ProductSchema);
export default Product;