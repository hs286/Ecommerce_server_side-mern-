import mongoose from "mongoose";

const adminModel=new mongoose.Schema({
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
    }
},{versionKey:false});

var Admin=mongoose.model("Admins",adminModel);
export default Admin;
