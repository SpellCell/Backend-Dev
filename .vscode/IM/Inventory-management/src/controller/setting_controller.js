import { StatusCodes } from "http-status-pro-js";
import User from "../model/user.js";
import bcrypt from "bcrypt";


// GET PROFILE
export function getProfile(req,res){

    try{

        User.findById(req.user.id, { password: 0 })
        .then((data)=>{

            return res.status(StatusCodes.OK.code).json({
                code: StatusCodes.OK.code,
                message: StatusCodes.OK.message,
                data: data
            })

        })
        .catch((err)=>{
            console.log(err);
        })

    }catch(err){
        console.log("profile error ",err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        })
    }
}


// UPDATE PASSWORD
export function updatePassword(req,res){

    try{

        let { currentPassword, newPassword } = req.body;

        User.findById(req.user.id)
        .then((data)=>{

            if(!data){
                return res.status(StatusCodes.BAD_REQUEST.code).json({
                    code: StatusCodes.BAD_REQUEST.code,
                    message: "User not found",
                    data: null
                })
            }

            let match = bcrypt.compareSync(currentPassword, data.password);

            if(!match){
                return res.status(StatusCodes.BAD_REQUEST.code).json({
                    code: StatusCodes.BAD_REQUEST.code,
                    message: "Current password incorrect",
                    data: null
                })
            }

            let hash = bcrypt.hashSync(newPassword,10);

            data.password = hash;

            data.save()
            .then(()=>{

                return res.status(StatusCodes.OK.code).json({
                    code: StatusCodes.OK.code,
                    message: "Password updated successfully",
                    data: null
                })

            })
            .catch((err)=>{
                console.log(err);
            })

        })
        .catch((err)=>{
            console.log(err);
        })

    }catch(err){
        console.log("password error ",err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        })
    }
}

export async function updateProfile(req,res){
    try{

        const { name, email, phone } = req.body;

        const updated = await User.findByIdAndUpdate(
            req.user.id,
            { name, email, phone },
            { new: true }
        );

        return res.json({
            message: "Profile updated",
            data: updated
        });

    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error" });
    }
}


// UPDATE SETTINGS
export function updateSettings(req,res){

    try{

        let settings = req.body;

        User.findByIdAndUpdate(
            req.user.id,
            { settings },
            { new: true }
        )
        .then((data)=>{

            return res.status(StatusCodes.OK.code).json({
                code: StatusCodes.OK.code,
                message: "Settings updated",
                data: data.settings
            })

        })
        .catch((err)=>{
            console.log(err);
        })

    }catch(err){
        console.log("settings error ",err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        })
    }
}