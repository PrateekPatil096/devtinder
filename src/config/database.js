const mongoose=require("mongoose")

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://prateekpatil096_db_user:Classmate123@cluster0.w5hfl8l.mongodb.net/devtinder"
    );
};

module.exports=connectDB;