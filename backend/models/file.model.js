const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  fileType: String,
  fileData:String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  fileCode: Number
},{
  versionKey: false,
  timeStamps: true,
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = {
    FileModel
}