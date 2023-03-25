import mongoose from "mongoose";

const homeModel=new mongoose.Schema({

    category:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    image:[{
        _id: false,
        type:String,
        required:true,
    }],

},{versionKey:false});

var Home=mongoose.model("homes",homeModel);
export default Home;
