

const {Usermodel} = require("../models/users.model");
const {FileModel} = require('../models/file.model');
const mongoose = require('mongoose')
const multer = require('multer');
const upload =  multer({ storage: multer.memoryStorage() });

exports.uploadFile = async(req,res)=>{

  const { originalname, mimetype, buffer } = req.file;
  const code = Math.floor(100000+Math.random()*900000);
  const userID = req.headers.userID;
  try {

    const user = await Usermodel.findById({_id:userID})

    if(!user){
      return res.status(500).send({status:"FAILED",message:"Please logged-in"})
    }
    // Create a new file document
    const newFile = new FileModel({
        filename: originalname,
        fileType: mimetype,
        fileData: buffer,
        fileCode:code,
        userId:userID
    });
    user.files.push(newFile._id)
    // Save the file to MongoDB
    await newFile.save()
    await user.save();
    res.send({status:"OK",message:"File Uploaded",code});

  } catch (error) {
    res.send({status:"FAILED",message:error});
  }
}

exports.getFile = async (req, res) => {

  const { fileId } = req.params;
  const userID = req.headers.userID;
  
  try{
    const file =await FileModel.findById({_id:fileId})
    if (!file) {
        return res.status(404).send('File not found');
    }
    if(userID!=file.userId){
        return res.status(404).send('Not Authorized');
    }

    res.setHeader('Content-Type', file.fileType);
    res.send(file.fileData);
  }catch(err){
    console.log(err)
  }
};

exports.getAllFile = async (req, res) => {
    const userID = req.headers.userID;
  
    try{
        // const user = await Usermodel.findById({_id:'648891dc5c3410b495476d9f'})
      const userFileData = await Usermodel.aggregate([
        { 
            $match: { $expr : { $eq: [ '$_id' , { $toObjectId: userID } ] } } 
        },
        {
            "$unwind": "$files"
        },
        {
            "$lookup": {
              "from": "files",
              "localField": "files",
              "foreignField": "_id",
              "as": "files"
            }
          },
          {
            "$unwind": "$files"
            },
          {
            "$group": {
              "_id": "$_id",
              "files": {"$push": "$files"}
            }
          },
      ])
    res.send(userFileData)

    }catch(err){
      console.log(err)
      res.send(err)
    }
};
  