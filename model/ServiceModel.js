import mongoose from "mongoose";

const serviceModel=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:mongoose.Types.Decimal128,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    area:{
        type:mongoose.Types.Decimal128,
        require:true,
    },
    unit:{
        type:String,
        require:true,
    },
    image:{
        _id: false,
        type:String,
        required:true,
    },

},{versionKey:false});

var Service=mongoose.model("services",serviceModel);
export default Service;
