const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./modles/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");

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
    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(isPasswordValid){
      const token=await jwt.sign({_id:user._id},"dev@tinder$790");
      res.cookie("token",token);
      res.send("login successful!!");
    }else{
      throw new Error("inavalid");
    }
}
catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/profile",async(req,res)=>{
    try{
      const cookies=req.cookies;
      const {token}=cookies;
      if(!token){
        throw new Error("invalid token")
      }
      const decodedMessage=await jwt.verify(token,"dev@tinder$790");
      const {_id}=decodedMessage;
      const user=await User.findById(_id);
      if(!user){
        throw new Error("user doea not exist");
      }
      res.send(user);

    }catch(err){
      res.status(400).send("error"+err.message);

    }
})

app.get("/user", async (req, res) => {
  const useremail = req.body.email;

  try {
    const users = await User.find({ email: useremail });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong ");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch {
    res.status(400).send("something went wrong ");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const allowedUpdates = ["photoURL", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("update is not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("more tahn 10 skills are not allowed");
    }

    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });

    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong: " + err.message);
  }
});

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
