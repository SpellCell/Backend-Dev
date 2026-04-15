import { StatusCodes } from "http-status-pro-js";
import jwt from "jsonwebtoken";

export function checkAdmin(req,res,next){

    try{

        let token = req.headers.authorization;

        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED.code).json({
                code:StatusCodes.UNAUTHORIZED.code,
                message:"No token provided",
                data:null
            })
        }

        token = token.split(" ")[1];

        let decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "admin"){
            return res.status(StatusCodes.UNAUTHORIZED.code).json({
                code:StatusCodes.UNAUTHORIZED.code,
                message:"Access denied. Admin only",
                data:null
            })
        }

        req.user = decoded;

        next();

    }catch(err){
        console.log("middleware error ",err);

        return res.status(StatusCodes.UNAUTHORIZED.code).json({
            code:StatusCodes.UNAUTHORIZED.code,
            message:"Invalid token",
            data:null
        })
    }
}