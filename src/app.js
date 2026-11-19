const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./modles/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const{userAuth}=require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();

    res.send("user data sent succefully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login",async(req,res)=>{
try{
    const{email,password}=req.body;
    const user=await User.findOne({email:email});

    if(!user){
      throw new Error("invalid E");
    }
    const isPasswordValid=await user.validatePassword(password);

    if(isPasswordValid){
      const token = await user.getJWT();

      res.cookie("token",token,{
        expires:new Date(Date.now()+8*3600000),
      });
      res.send("login successful!!");
    }else{
      throw new Error("inavalid");
    }
}
catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/profile",userAuth,async(req,res)=>{
    try{
      const user=req.user;
      res.send(user);

    }catch(err){
      res.status(400).send("error"+err.message);

    }
});

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user=req.user;
  console.log("sending a connection request");
  res.send(user.firstName+"  sent the connection request");
})

connectDB()
  .then(() => {
    console.log("database connection successfully ");
    app.listen(7777, () => {
      console.log("server is successfully listenting on port 7777");
    });
  })

  .catch((err) => {
    console.error("database cannot be connected", err);
  });
