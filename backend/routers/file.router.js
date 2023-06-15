const express = require("express");
const fileRouter = express.Router();
const {authentication} = require("../middleware/authentication");
const multer = require('multer');
const upload =  multer({ storage: multer.memoryStorage() });
const fileController = require("../controllers/file.controller");

fileRouter.post("/upload",authentication,upload.single('file'),fileController.uploadFile)
fileRouter.get('/:fileId',fileController.getFile)
fileRouter.get('/',authentication,fileController.getAllFile);


module.exports={
  fileRouter
}