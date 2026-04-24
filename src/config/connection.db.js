import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_URL;
mongoose.connect(url)
.then(()=>{
    console.log("DB CONNECTED");
})
.catch((err)=>{
    console.log("DB DIKKAT DE RHA HAI", err);
})

export default mongoose;