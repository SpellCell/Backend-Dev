import express from "express";

// controllers
import createUser, { userLogin } from "../controller/user_controller.js";
import { createProduct, getProducts } from "../controller/product_controller.js";
import { createSupplier } from "../controller/supplier_controller.js";
import { createPurchase } from "../controller/purchase_controller.js";
import { createSale } from "../controller/sale_controller.js";
import { getInventorySummary } from "../controller/inventory_controller.js";
import { deleteProduct } from "../controller/product_controller.js";
import { getPurchases } from "../controller/purchase_controller.js";
import { deletePurchase } from "../controller/purchase_controller.js";
import { getSales } from "../controller/sale_controller.js";
import { deleteSale } from "../controller/sale_controller.js";
import { getProfile,updateProfile,updatePassword,updateSettings } from "../controller/setting_controller.js";
import { verifyToken } from "../middleware/auth.js";

// middleware
import { checkAdmin } from "../middleware/auth_middleware.js";

const router = express.Router();


// user routes
router.post("/register", createUser);
router.post("/login", userLogin);


// product routes
router.post("/product", checkAdmin, createProduct);
router.get("/getproduct", getProducts);
router.delete("/product/:id", deleteProduct);


// supplier routes
router.post("/supplier", checkAdmin, createSupplier);


// purchase routes
router.post("/purchase", checkAdmin, createPurchase);
router.get("/purchase", getPurchases);
router.delete("/purchase/:id", deletePurchase);


// sale routes
router.post("/sale", checkAdmin, createSale);
router.get("/sales", getSales);
router.delete("/sales/:id", deleteSale);

// inventory routes
router.get("/inventory", getInventorySummary);


// setting routes
router.get("/user/profile", verifyToken, getProfile);
router.put("/user/profile", verifyToken, updateProfile);
router.put("/user/password", verifyToken, updatePassword);
router.put("/user/settings", verifyToken, updateSettings);


export default router;