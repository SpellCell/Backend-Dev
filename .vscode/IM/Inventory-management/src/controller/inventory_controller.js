import { StatusCodes } from "http-status-pro-js";
import Product from "../model/product.js";
import Inventory from "../model/inventory.js";

export async function getInventorySummary(req,res){

    try{

        await Product.find()
        then((products)=>{

            let totalProducts = products.length;
            let totalQuantity = 0;
            let totalValue = 0;
            let lowStockItems = [];

            products.forEach((item)=>{

                totalQuantity += item.quantity;
                totalValue += item.quantity * item.price;

                if(item.quantity < 10){
                    lowStockItems.push({
                        product: item._id,
                        quantity: item.quantity
                    })
                }

            });

            let data = {
                totalProducts,
                totalQuantity,
                totalValue,
                lowStockItems
            };

            return res.status(StatusCodes.OK.code).json({
                code: StatusCodes.OK.code,
                message: StatusCodes.OK.message,
                data: data
            });

        })
        .catch((err)=>{
            console.log(err);
        })

    }catch(err){
        console.log(err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}