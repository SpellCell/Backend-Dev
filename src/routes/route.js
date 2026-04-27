import express from "express";
import { createUser,userLogin,changePassword,updateProfile,getProfile,forgotPassword,verifyOtpAndReset } from "../controller/user_controller.js";
import { verifyToken } from "../middleware/auth.js";
import { addStock,sellStock,updateStock,deleteStock } from "../controller/stock_controller.js";



const router = express.Router();

//user route
router.post("/signup",createUser);
router.post("/login",userLogin);

// user profile handel
router.get("/getprofile",verifyToken,getProfile);
router.put("/update",verifyToken,updateProfile);
router.put("/updatePassword",verifyToken,changePassword);

// forget password
router.post("/forgot-password",forgotPassword);
router.post("/verify-otp",verifyOtpAndReset);

// stock

router.post("/stock/add",verifyToken,addStock);
router.post("/stock/sell",verifyToken,sellStock);
router.put("/stock/update",verifyToken,updateStock);
router.delete("/stock/delete",verifyToken,deleteStock);

export default router;