import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    unique: true,
  },
  productPrice: {
    type: Number,
    type: Number,
  },
  productId: {
    type: Number,
  },
});

// create product schema

const Product = mongoose.model("Product", ProductSchema);
export default Product;

// const init = async () => {
//   const products = [
//     {
//       productName: "Ice Cream - Strawberry",
//       productPrice: 9536,
//       productId: 1423,
//     },
//     {
//       productName: "Tomatoes - Diced, Canned",
//       productPrice: 16772,
//       productId: 1192,
//     },
//     { productName: "Peas - Pigeon, Dry", productPrice: 8762, productId: 1001 },
//     { productName: "Instant Coffee", productPrice: 3952, productId: 154 },
//     {
//       productName: "Cheese - Pied De Vents",
//       productPrice: 8229,
//       productId: 652,
//     },
//     { productName: "Sour Puss Raspberry", productPrice: 7739, productId: 930 },
//     { productName: "Pepsi - 600ml", productPrice: 11475, productId: 1827 },
//     { productName: "Tea - Decaf Lipton", productPrice: 14492, productId: 478 },
//     { productName: "Savory", productPrice: 13318, productId: 1667 },
//     {
//       productName: "Bread Crumbs - Japanese Style",
//       productPrice: 12380,
//       productId: 240,
//     },
//   ];
//   products.forEach(async (p) => {
//     let product = new Product(p);
//     await product.save();
//   });
// };
