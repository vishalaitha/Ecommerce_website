import User from "../models/user.js";
import Product from "../models/products.js";
import gst from "../controllers/tax.js";


// Show menu functionality, THIS IS ONLY FUNCTION WHICH ANYONE CAN USE WITHOUT LOGIN CREDENTIALS

const showMenu = async (req, res) => {
  const products = await Product.find({});
  const listwithprices = [];
  for (let i = 0; i < products.length; i++) {
    listwithprices.push(
      "Product id " +
        products[i].productId +
        " | Product name: " +
        products[i].productName +
        " | Product Price: " +
        products[i].productPrice
    );
  }
  res.send(listwithprices);
};

// Sign Up functionality

async function signupUser(req, res) {
  const body = req.body;
  const user = new User(body);
  console.log(user);
  try {
    await user.save();
    console.log("SUCCESFULLY CREATED AN ACCOUNT");
    res.send("YOU HAVE SUCCESFULLY CREATED AN ACCOUNT " + user);
  } catch (err) {
    console.log(err);
    console.log("not saved");
    res.send(err);
  }
}

// Login functionality

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  console.log(user);
  if (!user) {
    return res.send("User not found");
  }
  if (user.password != password) {
    return res.send("Invalid password");
  }
  res.send({ message: "Login successful", user: user });
};

//Authorization

const authorization = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({username:body.username});
  if (!user) {
    // console.log('here');
    return -1;
  } else if (user != null && user.password == body.password) {
    return 1;
  } else {
    return 0;
  }
};

// Get all users functionality

const getAllUsers = async (req, res) => {
  // this can be used to get all the users from the database but the access is only for admin

  const body = req.body;
  if (body.password == "admin123" && body.username == "admin") {
    const users = await User.find({});
    // init();
    res.send({ msg: "All the products are updated ", users });
  } else {
    res.send("You are not authorized to access this page");
  }
};

// Get cart for a specific user functionality

const getCart = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ username: req.params.id });
  const result = await authorization(req, res);
  if (result == 1) {
    const cart = user.cart;
    res.send(cart);
  } else if (result == -1) {
    res.send({ message: "You are not a valid user" });
  } else {
    res.send({ message: "Password entered is incorrect" });
  }
};

// Delete for a product

const removefromcart = async (req, res) => {
  const user = await User.findOne({ username: req.params.id });
  const result = await authorization(req, res);
  if (result == 1) {
    if (user.cart.includes(req.body.pid)) {
      const cart = user.cart;
      cart.pop(req.body.pid);
      await user.save();
      const cartupdated = user.cart;
      res.send({
        message: "Successfully removed from cart and your current cart is ",
        data: cartupdated,
      });
    } else {
      res.send({ message: "Product is not in the cart" });
    }
  } else if (result == -1) {
    res.send({ message: "You are not a valid user" });
  } else {
    res.send({ message: "Password entered is incorrect" });
  }
};

// Add cart for a specific user functionality

const addtocart = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ username: req.params.id });
  const result = await authorization(req, res);
  if (result == 1) {
    const cart = user.cart;
    if (cart.includes(req.body.pid)) {
      user.cart.push(req.body.pid);
      await user.save();
      res.send({ message: "Successfully added to cart", data: user.cart });
    } else {
      res.send((message = "Product is not available in the menu"));
    }
  } else if (result == -1) {
    res.send({ message: "You are not a valid user" });
  } else {
    res.send({ message: "Password entered is incorrect" });
  }
};

// Get bill for a specific user functionality

const getbill = async (req, res) => {
  const user = await User.findOne({ username: req.params.id });
  const result = await authorization(req, res);
  // console.log("result is " + result+" "+user);
  if (result == 1) {
    let bill = 0;
    const cart = user.cart;
    const dataofproducts = [];
    for (let i = 0; i < cart.length; i++) {
      const product = await Product.findOne({ productId: cart[i] });
      const taxapplied = product.productPrice + gst(product);
      const qty = cart.filter((x) => x == cart[i]).length;
      dataofproducts.push(
        "\nProduct Name: " +
          product.productName +
          " || Product Price: " +
          product.productPrice +
          " || Quantity: " +
          qty +
          " || Before Tax " +
          qty * product.productPrice +
          " || After Tax: " +
          qty * taxapplied
      );
      bill += taxapplied;
    }
    const productsset = new Set(dataofproducts);
    res.send("Total Bill value is " + bill + "\n" + Array.from(productsset));
  } else if (result == -1) {
    res.send({ message: "You are not a valid user" });
  } else {
    res.send("You're password is incorrect");
  }
};

// TAX CALCULATION IS DONE IN TAX.JS FILE


// This is only used when admin wants to add products to the database and if we call it once it will add evreything to the database

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

export {
  signupUser,
  loginUser,
  getAllUsers,
  getCart,
  addtocart,
  getbill,
  showMenu,
  removefromcart,
};
