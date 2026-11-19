const jwt=require("jsonwebtoken");
const User=require("../modles/user");

const userAuth=async(req,res,next)=>{
   try{
    const{token}=req.cookies;
    if(!token){
        throw new Error("token is next valid!!");
    }
    const decodedobj=await jwt.verify(token,"dev@tinder$790");
    const{_id}=decodedobj;
    const user=await User.findById(_id);
    if(!user){
        throw new Error("user is not found");
    }
    req.user=user;
    next();
   }catch(err){
    res.status(400).send("ERROR"+err.message);

   }
};

module.exports={
    
    userAuth,
};