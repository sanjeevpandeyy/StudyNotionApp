const mongoose=require("mongoose");

const profileschema=new mongoose.Schema({
  about:{
    type:String,
    trim:true,
  },
  gender:{
    type:String,
  },
  dateOfBirth:{
    type:String,
  },
  contactNumber:{
    type:Number,
    trim:true,
  },


})

module.exports= mongoose.model("Profile",profileschema);