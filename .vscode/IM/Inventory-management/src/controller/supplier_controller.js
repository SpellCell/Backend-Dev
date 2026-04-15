import { StatusCodes } from "http-status-pro-js";
import Supplier from "../model/supplier.js";

export async function createSupplier(req,res){
    let{name,contact,email,address} = req.body;

    try{
        let obj = new Supplier({name,contact,email,address});
        await obj.save()
        .then(()=>{
            return res.status(StatusCodes.CREATED.code).json({
                code:StatusCodes.CREATED.code,
                message:StatusCodes.CREATED.message,
                data:null
            })
        })
        .catch((err)=>{
            console.log(err);
        })

    }catch(err){
        console.log(err);
    }
}