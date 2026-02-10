import fs from "fs"
import {StatusCodes} from "http-status-pro-js"
 
function filter(req,res){
    try{
    if(!fs.existsSync("user.json")){
        logger("not_found");
        return res.status(StatusCodes.NOT_FOUND.code).json({
            code:StatusCodes.NOT_FOUND.code,
            message:StatusCodes.NOT_FOUND.message,
            data:null
        })
    }
    let data =JSON.parse(fs.readFileSync("user.json"));
    let array=data.filter((value)=> value.name.toLowerCase()== name.toLowerCase());
    logger("task complete");
    return res.status(StatusCodes.OK.code).json({
        code:StatusCodes.OK.code,
        message:StatusCodes.OK.code,
        data:null
    }).send(array);
}catch(error){
    logger(error,"internal server error");
    return res.status(StatusCodes.INTERBAL_SERVER_ERROR.code).json({
        code:StatusCodes.INTERBAL_SERVER_ERROR.code,
        message:StatusCodes.INTERBAL_SERVER_ERROR.message,
        data:null
    })
}
}export default filter;
