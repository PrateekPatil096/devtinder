const express=require("express");
const app=express();
const connectDB=require("./config/database");
const User=require("./modles/user")

app.use(express.json());

app.post("/signup",async(req,res)=>{
    const user= new User(req.body);
    try{
    await user.save();
    res.send("user data sent succefully");
    }
    catch (err){
        res.status(400).send("error saving the user")
        }

});

app.get("/user",async(req,res)=>{
    const useremail=req.body.email;

    try{
        const users=await User.find({email:useremail});
        if(users.length===0){
            res.status(404).send("user not found")
        }else{
            res.send(users)
        }
    }
        catch(err){
            res.status(400).send("something went wrong");

        }
    
});

app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("something went wrong ")
    }
})


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