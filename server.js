import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import Connection from "./database/db.js";
import AdminRoutes from "./routes/AdimRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import CartRoutes from "./routes/CartRoutes.js"

dotenv.config();
const app=express();
const PORT=process.env.PORT

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use('/admin',AdminRoutes);
app.use('/user',UserRoutes);
app.use('/product',ProductRoutes);
app.use('/userCart',CartRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

Connection();

