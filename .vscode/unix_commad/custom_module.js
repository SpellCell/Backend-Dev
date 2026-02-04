const fs = require("fs");
function writelog(data){
    fs.writeFileSync("first.txt",data);
    console.log("file created suuccessfully");
}
function readlog(){
   return fs.readFileSync("first.txt");
}
function cap(){
    let s=readlog().toString();
    let c=s.toUpperCase();
    return c;
}
function rev(){
    let s=readlog().toString();
    let n=s.length;
    let a=s.split(" ");
    let a2="";
    for(let i=a.length-1;i>=0;i--){
        a2+=a[i]+" ";
    }
    return a2;
}
function vow(){
    let s=readlog().toString();
    let h=s.toLowerCase();
    let count=0;
    for(let i=0;i<h.length;i++){
        if(h[i]=="a"|| h[i]=="i" || h[i]=="o" || h[i]=="e" || h[i]=="u"){
        count++;}

    }
    return count; 
}
module.exports={writelog,readlog,cap,rev,vow};