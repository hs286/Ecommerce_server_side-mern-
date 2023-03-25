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
    age:{
        type:Number,
        require:true,
    },
    phone:{
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
