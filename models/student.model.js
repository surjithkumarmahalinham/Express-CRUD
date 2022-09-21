const mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    studentId:Number,
    firstName:String,
    lastName:String,
    age:Number,
    dob:String,
    course:String
  });
  
  var StudentModel = mongoose.model("Student",studentSchema);

  module.exports = StudentModel;