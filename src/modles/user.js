const mongoose = require("mongoose");
const validator=require("validator")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("invalid email address"+value);
        }
    }
  },
  password: {
    type: String,
     validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("invalid password address"+value);
        }
    }
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("gender data is not valid");
      }
    },
  },

  photoURL: {
    type: String,
    default:
      "https://imgs.search.brave.com/VDY2RWKbbvRjQ85B9oq3dP9wOGv5NI4KrQ0oDaDm3A4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2RlZmF1bHQt/YXZhdGFyLXByb2Zp/bGUtaWNvbi1zb2Np/YWwtbWVkaWEtdXNl/ci1pbWFnZS1ncmF5/LWF2YXRhci1pY29u/LWJsYW5rLXByb2Zp/bGUtc2lsaG91ZXR0/ZS12ZWN0b3ItaWxs/dXN0cmF0aW9uXzU2/MTE1OC0zMzgzLmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA",
      validate(value){
        if(!validator.isURL(value)){
            throw new Error("invalid url "+value);
        }
    }
  },

  about: {
    type: String,
    default: "this is default about of the user",
  },

  skills: {
    type: [String],
  },
},{
    timestamps:true
});

const user = mongoose.model("user", userSchema);
module.exports = user;
