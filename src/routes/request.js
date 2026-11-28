const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../modles/connectionRequest");
const User = require("../modles/user");

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;

        
        const allowedStatus = ["ignored", "interested"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status type: " + status
            });
        }

        const toUser = await User.findById(toUserId);

        if (!toUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

      
        const fromUser = await User.findById(fromUserId);

       
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).send({
                message: "Connection request already exists"
            });
        }

       
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();

        res.status(200).json({
            message: fromUser.firstName + " is " + status + " in " + toUser.firstName,
            data
        });

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
});

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try{
    const loggedinUser=req.user;
    const {status,requestId}=req.params;

    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"status not allowed"});
    }

    console.log(requestId);
    console.log(loggedinUser)

    const connectionRequest=await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedinUser._id,
      status:"interested",
    });

    console.log(connectionRequest)

    if(!connectionRequest){
      return res.status(404).json({message:"connection request not found"});
    }

    connectionRequest.status=status;
    const data=await connectionRequest.save();
    res.json({message:"connection request "+status,data});

  }catch(err){
    res.status(400).send("error:"+err.message);

  }
})

module.exports = requestRouter;