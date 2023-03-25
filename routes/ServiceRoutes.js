import express from "express";
import {
  addService,
  deleteService,
  getServices,
  updateService,
  getServiceById
} from "../controller/ServiceController.js";
import multer from "multer";
import path from "path";
import { addHome, getHomeData } from "../controller/HomeController.js";

const route = express.Router();
const storage = multer.diskStorage({
  destination: "upload/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
   dest: "upload/",
});
const storage1 = multer.diskStorage({
  destination: "homeImages/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const homeImages=multer({
  storage:storage1,
  dest:"homeImages/"
})

route.post("/", upload.single("profileImage"), addService);
route.post("/home",homeImages.array("images",5),addHome);
route.get("/home",getHomeData)
route.get("/", getServices);
route.get("/:id", getServiceById);
route.put("/:id", upload.single("profileImage"), updateService);
route.delete("/:id", deleteService);

export default route;
