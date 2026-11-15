const validator= require("validator");

const validateSignUpData=(req)=>{
    const{firstName,lastName,email,password}=req.body;
    if(!firstName||!lastName){
        throw new Error("name is not valid");
    }

    else if(!validator.isEmail(email)){
        throw new Error("email is not valid");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("enter the strong password");
    }
};

module.exports={
    validateSignUpData,
};