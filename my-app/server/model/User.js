const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    trim:true,
  },
  lastName:{
    type:String,
  },

email:{
    type:String,
    required:true,
    
  },

  password:{
    type:String,
    required:true,
  },

  accountType:{
    type:String,
    enum:["Admin","Student","Instructor"],
    required:true,
  },

  
token: {
  type: String,
  default: null,
},

resetPasswordExpires: {
  type: Date,
  default: null,
},

  additionalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Profile",
  },
  
  courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
  }]

  ,
  image:{
    type:String,
  },
  coursesProgress:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"CoursesProgress",
  }
  
})

module.exports= mongoose.model("User",userschema);

