import mongoose from "mongoose";

const productModel=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    feature:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true
    },
    discount:{
        type:String,
        require:true,
    },
    image:[{
        _id: false,
        type:String,
        required:true,
    }],
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admins",
    },
},{versionKey:false});

var Product=mongoose.model("Products",productModel);
export default Product;
