import express from "express";
const router = express.Router();
import { signupUser,loginUser,getAllUsers,getCart,addtocart,getbill,showMenu} from "../controllers/auth.js";

// these are the routes that are using get methods

router.get("/getallusers", getAllUsers);

router.get("/showmenu",showMenu)

// these are the routes that are used in post methods

router.post("/:id/getbill",getbill)

router.post("/:id/getcart",getCart);

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/:id/addtocart",addtocart);

// router.post("/:id/removefromcart",removefromcart);

export default router;