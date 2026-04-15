import { StatusCodes } from "http-status-pro-js";
import Purchase from "../model/purchase.js";
import Product from "../model/product.js";


// CREATE PURCHASE
export async function createPurchase(req,res){

    try{

        let { product, quantity, price, supplier } = req.body;

        console.log("BODY:", req.body); 

        // Save purchase
        const savedPurchase = await new Purchase({
            product,
            quantity,
            price,
            supplier
        }).save();

        // Update product stock
        await Product.findByIdAndUpdate(product, {
            $inc: { quantity: Number(quantity) }
        });

        return res.status(StatusCodes.CREATED.code).json({
            code: StatusCodes.CREATED.code,
            message: "Purchase added successfully",
            data: savedPurchase
        });

    }catch(err){
        console.log("Purchase error:", err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
    }
}
export async function getPurchases(req,res){
    try{

        const data = await Purchase.find()
            .populate("product")
            .populate("supplier");

        return res.status(StatusCodes.OK.code).json({
            code: StatusCodes.OK.code,
            message: StatusCodes.OK.message,
            data: data
        });

    }catch(err){
        console.log(err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
    }
}
export async function deletePurchase(req,res){

    try{

        const { id } = req.params;

        // Find purchase first
        const purchase = await Purchase.findById(id);

        if(!purchase){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code: StatusCodes.NOT_FOUND.code,
                message: "Purchase not found",
                data: null
            });
        }

        // Decrease product stock
        await Product.findByIdAndUpdate(purchase.product, {
            $inc: { quantity: -purchase.quantity }
        });

        // Delete purchase
        await Purchase.findByIdAndDelete(id);

        return res.status(StatusCodes.OK.code).json({
            code: StatusCodes.OK.code,
            message: "Purchase deleted successfully",
            data: purchase
        });

    }catch(err){
        console.log("Delete purchase error:", err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
    }
}