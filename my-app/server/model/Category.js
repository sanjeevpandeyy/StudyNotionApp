const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
  course:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Course"
  }],
  name:{
    type:String,
    required:true,
    trim:true,
  },
  description:{
    type:String,
    required:true,
    trim:true,
  },

})

module.exports= mongoose.model("Category",categorySchema);
