const express=require("express");
const app=express();



app.get("/user",(req,res)=>{
    res.send({firsrname: "prateek",lastname: "patil"});
});

app.post("/user",(req,res)=>{
    res.send("data is sent sucessfully");
});

app.delete("/user",(req,res)=>{
    res.send("data is deleted");
});

app.patch("/user",(req,res)=>{
    res.send("patched successfully")
})



app.use("/test",(req, res)=>{
    res.send("helllo from the server");
});

app.listen(7777,()=>{
    console.log("server is successfully listenting on port 7777")
})