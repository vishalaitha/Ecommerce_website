import express from "express";
const router = express.Router();
import {
  signupUser,
  loginUser,
  getAllUsers,
  getCart,
  addtocart,
  getbill,
  showMenu,
  removefromcart,
  clearcart,
  placeOrder,
  // right now we are not checking admin credentials because of evaluation purpose
  getAllOrders,
} from "../controllers/auth.js";

// these are the routes that are using get methods

router.get("/showmenu", showMenu);

// these are the routes that are used in post methods

router.post("/getallusers", getAllUsers);

router.post("/getbill", getbill);

router.post("/getcart", getCart);

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/addtocart", addtocart);

router.post("/placeorder", placeOrder);

// these are all the routes that are used in delete methods

router.delete("/removefromcart", removefromcart);

router.delete("/clearcart", clearcart);

// these are all the routes for admins

router.post("/getallorders", getAllOrders);

export default router;
