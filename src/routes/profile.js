const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../modles/user");

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("error" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("invalid edit request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    console.log(loggedInUser);

    res.json({
      message: loggedInUser.firstName + " profile updated successfully",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

profileRouter.patch("/forgotPassword", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(200).json({
        message: "if account exist reset link will be sent",
      });
    }

    const token = jwt.sign({ _id: user._id }, "dev@tinder$790", {
      expiresIn: "10m",
    });

    const passwordHash=await bcrypt.hash(password,10);
    user.password=passwordHash;
    await user.save();

    res.json({
      message: "if account exits link will be sent",
    });
  } catch (err) {
    res.status(400).send("error" + err.message);
  }
});

module.exports = profileRouter;
