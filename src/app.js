const express=require("express");
const app=express();

app.use("/",(req,res)=>{
    res.send("Namaste prateek!!!!!  patil ");
});

app.use("/hello",(req, res)=>{
    res.send("hello hello helloooo!!");
});

app.use("/test",(req, res)=>{
    res.send("helllo from the server");
});

app.listen(7777,()=>{
    console.log("server is successfully listenting on port 7777")
})