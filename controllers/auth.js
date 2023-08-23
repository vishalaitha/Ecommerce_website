import User from "../models/user.js";
import Product from "../models/products.js";
import Order from "../models/orders.js";
import gst from "../controllers/tax.js";

// Show menu functionality, This is the only function which doesn't need authorization

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
    res.send({
      message:
        "Congrats!, You have succefully created an account " + body.username,
    });
  } catch (err) {
    console.log(err);
    console.log("not saved");
    res.send({ message: "Please try again with a different username" });
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
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return -1;
  } else if (user != null && user.password == body.password) {
    return 1;
  } else {
    return 0;
  }
};

// Check if product exists in our database

const productexists = async (req, res) => {
  const body = req.body;
  const prod = await Product.findOne({ productId: body.pid });
  if (prod != null) {
    return 1;
  } else {
    return 0;
  }
};
// Get all users functionality

const getAllUsers = async (req, res) => {
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
  const user = await User.findOne({ username: req.body.username });
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
  const result = await authorization(req, res);
  if (result == 1) {
    const user = await User.findOne({ username: req.body.username });
    const result = productexists(req);
    if (
      user.password == req.body.password &&
      user.cart.includes(req.body.pid)
    ) {
      const cart = user.cart;
      const prod=cart.findOne(req.body.pid);
      cart.remove(prod);
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
  const user = await User.findOne({ username: req.body.username });
  const result = await authorization(req, res);
  if (result == 1) {
    const result = await productexists(req, res);
    if (result == 1) {
      user.cart.push(req.body.pid);
      await user.save();
      res.send({ message: "Successfully added to cart", data: user.cart });
    } else {
      console.log("here");
      res.send({ message: "Product is not available in the menu" });
    }
  } else if (result == -1) {
    res.send({ message: "You are not a valid user" });
  } else {
    res.send({ message: "Password entered is incorrect" });
  }
};

// Clear cart for a specific user functionality

const clearcart = async (req, res) => {
  console.log(req);
  const result = await authorization(req, res);
  if (result == 1) {
    const user = await User.findOne({ username: req.body.username });
    user.cart = [];
    await user.save();
    res.send({ message: "successfully cleared the cart", data: user.cart });
  } else if (result == -1) {
    res.send({ message: "You are not a valid user" });
  } else {
    res.send("You're password is incorrect");
  }
};

// Get bill for a specific user functionality

const getbill = async (req, res) => {
  console.log(req);
  const result = await authorization(req, res);
  // console.log("result is " + result+" "+user);
  if (result == 1) {
    const user = await User.findOne({ username: req.body.username });
    console.log(result);
    let bill = 0;
    const cart = user.cart;
    const dataofproducts = [];
    for (let i = 0; i < cart.length; i++) {
      const product = await Product.findOne({ productId: cart[i] });
      const taxapplied = product.productPrice + gst(product);
      const qty = cart.filter((x) => x == cart[i]).length;
      dataofproducts.push(
        "Product Name: " +
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
    const final = Array.from(productsset);
    res.send("Total Bill value is " + bill + "\n" + Array.from(productsset));
  } else if (result == -1) {
    res.send({ message: "You are not a valid user" });
  } else {
    res.send("You're password is incorrect");
  }
};

// Tax calculation is done in tax.js file

const savethisorder = async (req, res) => {
  const order = new Order(req);

  try {
    await order.save();
    console.log(order);
    console.log("SUCCESFULLY CREATED AN ORDER");
  } catch (err) {
    console.log(err);
  }
};

// get all orders for admin functionality but right now we're not checking credentials

const getAllOrders = async (req, res) => {
  const allorders = await Order.find({});
  const result = allorders;
  console.log(result);
  res.send(result);
};

// Place order functionality

const placeOrder = async (req, res) => {
  const result = await authorization(req, res);
  if (result == 1) {
    const user = await User.findOne({ username: req.body.username });
    let bill = 0;
    const cart = user.cart;
    const dataofproducts = [];
    for (let i = 0; i < cart.length; i++) {
      const product = await Product.findOne({ productId: cart[i] });
      const taxapplied = product.productPrice + gst(product);
      const qty = cart.filter((x) => x == cart[i]).length;
      dataofproducts.push(
        "Product Name: " +
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
    const final = Array.from(productsset);
    const obj = { username: user.username, items: final };
    const here = {
      username: user.username,
      items: final,
    };
    const object = await savethisorder(here);
    res.send(
      "You're order is succesfully placed \nYour bill value is " +
        bill +
        "\n" +
        final
    );
  } else if (result == -1) {
    res.send({ message: "You are not a valid user" });
  } else {
    res.send("You're password is incorrect");
  }
};

// exporting all the functions

export {
  signupUser,
  loginUser,
  getAllUsers,
  getCart,
  addtocart,
  getbill,
  showMenu,
  removefromcart,
  clearcart,
  getAllOrders,
  placeOrder,
};

// Thanks for reading till here 😊
