const adminAuth=(req,res,next)=>{
    console.log("admin auth is getting checked");
    const token="xyz";
    const isAdminAuthorsized=token==="xyz";

    if(!isAdminAuthorsized){
        res.status(401).send("unauthorized request");
    }else{
        next();
    }
};

const userAuth=(req,res,next)=>{
    console.log("user auth is getting checked ");
    const token="xyz";
    const isAdminAuthorsized=token==="xyz";

    if(!isAdminAuthorsized){
        res.status(401).send("unauthorized request");
    }else{
        next();
    }
};

module.exports={
    adminAuth,
    userAuth,
};