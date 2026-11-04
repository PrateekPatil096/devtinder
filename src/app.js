const express=require("express");
const app=express();

const {adminAuth,userAuth}=require("./middlewares/auth");

//app.use("/admin",adminAuth)

app.post("/user/login",(req,res)=>{
    res.send("user login successfully");
});


app.get("/user",userAuth,(req,res)=>{
    res.send("user data sent ");
});

app.get("/admin/getAllData",adminAuth,(req,res)=>{
    res.send("all data is sent");
});

app.get("/admin/deleteUser",adminAuth,(req,res)=>{
    res.send("deleted a user")
})

app.listen(7777,()=>{
    console.log("server is successfully listenting on port 7777")
})