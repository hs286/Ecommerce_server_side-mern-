import express  from "express";
import { addAdmin, checkAdminLogin, deleteAdmin, updateAdmin } from "../controller/AdminController.js";

const route = express.Router();

route.post('/',addAdmin);
route.put('/:id',updateAdmin);
route.delete('/:id',deleteAdmin);
route.post('/login',checkAdminLogin)

export default route;