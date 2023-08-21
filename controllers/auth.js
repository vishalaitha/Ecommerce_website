import User from "../models/user.js";
import Product from "../models/products.js";

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
  const user = await User.findOne({ username: req.params.id });
  if (!user) {
    return false;
  } else if (user.password == body.password) {
    return true;
  } else {
    return false;
  }
};

// Get all users functionality

const getAllUsers = async (req, res) => {
  // this can be used to get all the users from the database but the access is only for admin
  const body = req.body;
  if (body.password == "admin123" && body.username == "admin") {
    const users = await User.find({});
    res.send(users);
  } else {
    res.send("You are not authorized to access this page");
  }
};

// Get cart for a specific user functionality

const getCart = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ username: req.params.id });

  if (authorization(req, res)) {
    const cart = user.cart;
    res.send(cart);
  } else {
    res.send("You are not authorized to access this page");
  }
};

// Add cart for a specific user functionality

const addtocart = async (req, res) => {

  const body = req.body;
  const user = await User.findOne({ username: req.params.id });

  if (authorization(req,res)) {
    const cart = user.cart;
    user.cart.push(req.body.pid);
    await user.save();
    res.send({ message: "Successfully added to cart", data: user.cart });
  } else {
    res.send("You are not authorized to access this page");
  }
};

// Get bill for a specific user functionality

const getbill = async (req, res) => {
  const user = await User.findOne({ username: req.params.id });
  if (authorization(req,res)) {
    let bill = 0;
    const cart = user.cart;
    for (let i = 0; i < cart.length; i++) {
      const product = await Product.findOne({ productId: cart[i] });
      bill += product.productPrice;
    }
    res.send("Bill is " + bill);
  } else {
    res.send("You are not authorized to access this page");
  }
};

// Show menu functionality

const showMenu = async (req, res) => {
  const products = await Product.find({});
  const listwithprices = [];
  for (let i = 0; i < products.length; i++) {
    listwithprices.push(
      products[i].productName + " " + products[i].productPrice
    );
  }
  res.send(listwithprices);
};
export {
  signupUser,
  loginUser,
  getAllUsers,
  getCart,
  addtocart,
  getbill,
  showMenu,
};
