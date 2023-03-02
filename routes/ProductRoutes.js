import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controller/ProductController.js";
import multer from "multer";
import path from "path";
import { CheckPermission } from "../controller/PermissionController.js";

const route = express.Router();
const storage = multer.diskStorage({
  destination: "productImages/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  dest: "productImages/",
});

route.post("/", upload.array("images", 4), addProduct);
route.get("/", CheckPermission, getAllProduct);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);

export default route;
