const express=require("express");
const app=express();

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");
    }
});

app.get("/getUserData",(req,res)=>{
    //try{
        throw new Error("asdfghjk");
        res.send("user data sent")
   // }catch{
        res.status(500).send("something wrong")
    //}
});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");
    }
});

app.listen(7777,()=>{
    console.log("server is successfully listenting on port 7777")
})