const express=require("express");
const app=express();



app.get("/user/:userid/:name/:password",(req,res)=>{
    console.log(req.params);
    
    res.send({firsrname: "prateek",lastname: "patil"});
});







app.listen(7777,()=>{
    console.log("server is successfully listenting on port 7777")
})