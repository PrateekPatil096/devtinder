const express=require("express");
const app=express();
const connectDB=require("./config/database");
const User=require("./modles/user")

app.post("/signup",async(req,res)=>{
    const user= new User({
        firstName: "cristiano",
        lastName: "ronaldo",
        email: "cr7@gmail.com",
        password: "cr7@777",

    });
    try{
    await user.save();
    res.send("user data sent succefully");
    }
    catch (err){
        res.status(400).send("error saving the user")
        }

});


connectDB()
    .then(()=>{
        console.log("database connection successfully ")
         app.listen(7777,()=>{
        console.log("server is successfully listenting on port 7777")
    });
})

.catch((err)=>{
    console.error("database cannot be connected");
})