const express = require("express");
const fileRouter = express.Router();
const jwt = require("jsonwebtoken");
const multer = require('multer');
const {FileModel} = require('../models/file.model')
const storage = multer.memoryStorage()
const upload =  multer({ storage: multer.memoryStorage() });


fileRouter.post("/upload",upload.single('profile_pic'),async(req,res)=>{

  const { originalname, mimetype, buffer } = req.file;

  const code = Math.floor(100000+Math.random()*900000);
  try {

    // Create a new file document
    const newFile = new FileModel({
        filename: originalname,
        fileType: mimetype,
        fileData: buffer,
        fileCode:code
    });

    // // Save the file to MongoDB
    await newFile.save();

    res.json({ file: newFile });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file');
  }
})

  
module.exports={
    fileRouter
}