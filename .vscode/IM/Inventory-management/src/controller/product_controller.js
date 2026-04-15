import { StatusCodes } from "http-status-pro-js";
import Product from "../model/product.js";


// CREATE PRODUCT
export async function createProduct(req,res){
    try{

        let{name,category,price,quantity,supplier,description} = req.body;

        let obj = new Product({name,category,price,quantity,supplier,description});

        await obj.save(); 

        return res.status(StatusCodes.CREATED.code).json({
            code:StatusCodes.CREATED.code,
            message:StatusCodes.CREATED.message,
            data: obj  
        });

    }catch(err){
        console.log("create product ",err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        });
    }
}


// GET PRODUCTS
export async function getProducts(req,res){
    try{

        const data = await Product.find();  

        return res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:StatusCodes.OK.message,
            data:data
        });

    }catch(err){
        console.log(err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        });
    }
}
export async function deleteProduct(req,res){

    try{

        const { id } = req.params;

        const deleted = await Product.findByIdAndDelete(id);

        if(!deleted){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:"Product not found",
                data:null
            });
        }

        return res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:"Product deleted successfully",
            data:deleted
        });

    }catch(err){
        console.log("delete error", err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        });
    }
}