const fs = require("fs");
function writelog(data){
    fs.writeFileSync("first.txt",data);
    console.log("file created suuccessfully");

}
function readlog(){
   return fs.readFileSync("first.txt");


}
function count(){
    let count=0;
    let s=readlog().toString();
    let arr=s.split(" ");
    return arr.length;  

}
module.exports={writelog,readlog,count};