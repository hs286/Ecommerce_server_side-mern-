import express  from "express"
import { addUser, LoginUser, deleteUser, getAllUser, getUserById, updateUserPassword } from "../controller/UserController.js";

const route=express.Router();

route.post('/',addUser);
route.post('/login',LoginUser);
route.get('/',getAllUser);
route.get('/:id',getUserById);
route.put('/',updateUserPassword);
route.delete('/:id',deleteUser);

export default route;