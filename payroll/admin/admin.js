import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
export function reg(req,res){
    let{name,email,password} = req.body;
    try{
        let salt= bcrypt.genSaltSync(10); // A promise to be either resolved with the generated salt or rejected with an Error
        let hashpassword= bcrypt.hashSync(password,salt);// data to be encrpted and the salt to be mixed
        password = hashpassword;
        let arr = [];
        let obj = {
            id:Date.now(),name,email,password
        }
        if(!name || !email || !password){
             return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        }
        if(fs.existsSync("admin.json")){
            let data = JSON.parse(fs.readFileSync("admin.json","utf-8"));
            let isUser = data.find((value)=> value.email == email)
            if(isUser){
                 return res.status(StatusCodes.CONFLICT.code).json({
            code:StatusCodes.CONFLICT.code,
            message:StatusCodes.CONFLICT.message,
            data:null
        })
            }
            arr = data;
        }
        arr.push(obj);
        fs.writeFileSync("admin.json",JSON.stringify(arr,null,2));
        res.status(StatusCodes.CREATED.code).json({
            code:StatusCodes.CREATED.code,
            message:StatusCodes.CREATED.message,
            data:null
        })
    }catch(err){
        console.log(" register admin ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

//admin login
export function login(req,res){
    const{email,password} = req.body;
    try{
        if(!email || !password){
             return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        }
        if(!fs.existsSync("admin.json")){
            return res.status(StatusCodes.NOT_FOUND.code).json({
            code:StatusCodes.NOT_FOUND.code,
            message:StatusCodes.NOT_FOUND.message,
            data:null
        })
        }
        let data =JSON.parse(fs.readFileSync("admin.json","utf-8"));
        let isEmp = data.find((value)=> value.email == email);
        let iscorrect =bcrypt.compareSync(password, isEmp.password);
           
         if(!isEmp && !iscorrect){
              return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:StatusCodes.NOT_FOUND.message,
                data:null
                })
           }
    let token = jwt.sign({id:isEmp.id}, process.env.TOKEN,{expiresIn:"4h"}) //Sign the given payload into a JSON Web Token string
        
            res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:StatusCodes.OK.message,
            data: {isEmp:isEmp,token}

        })
    }catch(err){
        console.log("login admin",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// admin delete

export function deleteaAdmin(req,res){
    try{
        if(!id){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.INTERNAL_SERVER_ERROR.code,
                message:StatusCodes.INTERNAL_SERVER_ERROR.message,
                data:null
            })
        }
        if(!fs.existsSync("admin.json")){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
        }
        let data=JSON.parse(fs.readFileSync("admin.json", "utf-8"));
        let isAdmin=data.find((value)=> value.id == id);
        if(!isAdmin){
            return res.status(StatusCodes.NOT_FOUND.code).josn({
                code:StatusCodes.NOT_FOUND.code,
                message:StatusCodes.NOT_FOUND.message,
                data:null
            })
        }
        let admin= data.filter((value)=> value.id !== id);
        fs.writeFileSync("admin.josn",JSON.stringify(admin,null,2));
        res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:StatusCodes.OK.message,
            data:null

        })
        

    }
    catch(err){
        console.log("admin delete", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// admin update 

export function updateAdmin(res,req){
    const{id,email} =req.body;
    try{
        if(!id || !email || !mob || !salary){
                     return res.status(StatusCodes.BAD_REQUEST.code).json({
                    code:StatusCodes.BAD_REQUEST.code,
                    message:StatusCodes.BAD_REQUEST.message,
                    data:null
                })
                }
                if(!fs.existsSync("emp.json")){
                    return res.status(StatusCodes.NOT_FOUND.code).json({
                    code:StatusCodes.NOT_FOUND.code,
                    message:StatusCodes.NOT_FOUND.message,
                    data:null
                })
                }
                let data =JSON.parse(fs.readFileSync("emp.json","utf-8"));
                let idx = data.findIndex((value)=> value.id == id)
                   
                 if(idx===-1){
                      return res.status(StatusCodes.NOT_FOUND.code).json({
                        code:StatusCodes.NOT_FOUND.code,
                        message:StatusCodes.NOT_FOUND.message,
                        data:null
                        })
                   }
                    data[idx].email = email;
                    data[idx].mob = mob;
                    data[idx].salary = salary;
                fs.writeFileSync("emp.json",JSON.stringify(data,null,2));
                    res.status(StatusCodes.OK.code).json({
                    code:StatusCodes.OK.code,
                    message:StatusCodes.OK.message,
                    data:null
                })
        

    }catch(err){
        console.log("admin update", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}