import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import Connection from "./database/db.js";

import ServiceRoutes from "./routes/ServiceRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";


dotenv.config();
const app=express();
const PORT=process.env.PORT

app.use("/images",express.static("upload"))


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use('/service',ServiceRoutes);
app.use('/user',UserRoutes);


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

Connection();

