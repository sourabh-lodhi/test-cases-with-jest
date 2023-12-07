const validator = require("validator");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  password_confirmation: String,

  // name :{
  //     type :String,
  //     required : true,
  //     minlength : 3
  // },
  // password : String,
  // cpassword : {
  //    type : Number,
  //    min : 10,
  // },
  // email : {
  //     type :String,
  //     required : true,
  //     unique : [true , 'email id already present i'],
  //     validate(value){
  //         if(!validator.isEmail(value)){
  //             throw new Error('Invalid Email');
  //         }
  //     }
  // }
});

const Student = new mongoose.model("Student", studentSchema);
module.exports = Student;
