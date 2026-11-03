const express=require("express");
const app=express();

app.use(
    "/user",
    (req,res,next)=>{
        console.log("handling rouet user 1!!");
        //res.send("response 1!!");
        next();
    },

    (req,res,next)=>{
        console.log("handling route user 2!!");
        //res.send("2nd response!!")
        next();
    },
    (req,res,next)=>{
        console.log("handling route user 3!!");
        //res.send("3nd response!!")
        next();
    },
    (req,res)=>{
        console.log("handling route user 4!!");
        res.send("4nd response!!")
    }
)

app.listen(7777,()=>{
    console.log("server is successfully listenting on port 7777")
})