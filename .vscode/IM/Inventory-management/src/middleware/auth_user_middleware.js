import { StatusCodes } from "http-status-pro-js";

export function checkUser(req,res,next){

    try{

        let{email} = req.body;

        if(!email){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:"User not valid",
                data:null
            })
        }

        next();

    }catch(err){
        console.log(err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}