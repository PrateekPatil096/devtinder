const express=require("express");
const authRouter=express.Router();

const { validateSignUpData } = require("../utils/validation");
const bcrypt=require("bcrypt");
const User = require("../modles/user");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login",async(req,res)=>{
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

module.exports=authRouter;