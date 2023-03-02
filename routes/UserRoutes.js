import express  from "express"
import { addUser, LoginUser, deleteUser, getAllUser, getUserById, updateUser } from "../controller/UserController.js";

const route=express.Router();

route.post('/',addUser);
route.get('/',getAllUser);
route.get('/:id',getUserById);
route.put('/:id',updateUser);
route.delete('/:id',deleteUser);
route.post('/login',LoginUser)

export default route;