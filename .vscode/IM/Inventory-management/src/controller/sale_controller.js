import { StatusCodes } from "http-status-pro-js";
import Sale from "../model/sales.js";
import Product from "../model/product.js";


// CREATE SALE
export async function createSale(req,res){

    try{

        let { product, quantity, price } = req.body;

        console.log("BODY:", req.body); 

        // Save sale
        const savedSale = await new Sale({
            product,
            quantity,
            price
        }).save();

        // Decrease product stock
        await Product.findByIdAndUpdate(product, {
            $inc: { quantity: -Number(quantity) }   
        });

        return res.status(StatusCodes.CREATED.code).json({
            code: StatusCodes.CREATED.code,
            message: "Sale added successfully",
            data: savedSale  
        });

    }catch(err){
        console.log("Sale error:", err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
    }
}
export async function getSales(req,res){
    try{

        const data = await Sale.find()
            .populate("product");

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
export async function deleteSale(req,res){

    try{

        const { id } = req.params;

        const sale = await Sale.findById(id);

        if(!sale){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code: StatusCodes.NOT_FOUND.code,
                message: "Sale not found",
                data: null
            });
        }

        // Restore product stock
        await Product.findByIdAndUpdate(sale.product, {
            $inc: { quantity: Number(sale.quantity) }
        });

        await Sale.findByIdAndDelete(id);

        return res.status(StatusCodes.OK.code).json({
            code: StatusCodes.OK.code,
            message: "Sale deleted successfully",
            data: sale
        });

    }catch(err){
        console.log("Delete sale error:", err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
    }
}