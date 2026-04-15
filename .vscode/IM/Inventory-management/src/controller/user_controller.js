import { StatusCodes } from "http-status-pro-js";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function createUser(req,res){

    console.log("----> ",req.body);
    
    let{name,email,password,role} =req.body;


    try{
        let pass = bcrypt.hashSync(password,10);
        password = pass;

        let obj = new User ({name,email,password,role});
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
        console.log("create ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}
export default createUser;


// login 
export async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        await User.findOne({ email: email })
        .then((data) => {

            if (!data) {
                return res.status(StatusCodes.BAD_REQUEST.code).json({
                    code: StatusCodes.BAD_REQUEST.code,
                    message: "User not found",
                    data: null
                });
            }

            const comPass = bcrypt.compareSync(password, data.password);

            if (!comPass) {
                return res.status(StatusCodes.BAD_REQUEST.code).json({
                    code: StatusCodes.BAD_REQUEST.code,
                    message: "Invalid password",
                    data: null
                });
            }

            // TOKEN GENERATION
            const token = jwt.sign(
                { id: data._id, role: data.role },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            return res.status(StatusCodes.OK.code).json({
                code: StatusCodes.OK.code,
                message: StatusCodes.OK.message,
                data: {
                    name: data.name,
                    role: data.role,
                    token: token
                }
            });

        })
        .catch((err) => {
            console.log(err);
        });

    } catch (err) {
        console.log("login error", err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
    }
}