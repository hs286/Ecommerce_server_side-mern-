import mongoose from "mongoose";

const UserModel=new mongoose.Schema({
    email:{
        type:String,
        require:true,   
        unique : true,
    },
    name:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
},{versionKey:false});

var User=mongoose.model("User",UserModel);
export default User;
