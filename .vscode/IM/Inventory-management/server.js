import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/route.js";

dotenv.config();

const app = express();


app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://10.30.72.123:5500"
    ],
    credentials: true
}));
app.use(express.json());

//app.use(cors({
 //   origin : "*",   //http://172.16.201.99:5500
   // credentials : true,
//}));

app.use("/",router);

const port = process.env.PORT ||  8080;

app.listen(port,()=>{
    console.log("READY BROTHER");
})