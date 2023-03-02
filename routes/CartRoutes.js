import express  from "express"
import { createUserCart,deleteCartProduct,getUserProduct,updateCart } from "../controller/CartController.js";
import { CheckPermission } from "../controller/PermissionController.js";

const route=express.Router();

route.post('/:id',CheckPermission,createUserCart);
route.get('/:id',CheckPermission,getUserProduct);
route.put('/:id',CheckPermission,updateCart);
route.delete('/:id',deleteCartProduct);


export default route;