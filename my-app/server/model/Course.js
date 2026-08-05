const mongoose=require("mongoose");

const CourseSchema=new mongoose.Schema({
  
  courseName: {
  type: String,
  required: true,
  trim: true,
},

  courseDescription:{
    type:String,
    trim:true,
  }
  ,
  instructor:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
    }
  ,
  whatYouWillLearn:{
    type:String,
  },

  courseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Section",
  }]
,
ratingAndReviews:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"RatingAndReviews",
  }]
,

price:{
  type:Number,
}
,
thumbnail:{
  type:String,
},
category:{
type:mongoose.Schema.Types.ObjectId,
  ref:"Category",
},
tag:{
  type:String,
},
studentEnrolled:[{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:"User",
}],

instructions: [{
     type: String,
}],

 status: {
  type: String,
  enum: [
    "Draft",
    "PendingApproval",
    "Published",
    "Rejected",
  ],
  default: "Draft",
},


approvedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},
rejectionReason: {
  type: String,
},
publishedAt: {
  type: Date,
},
})


module.exports= mongoose.model("Course",CourseSchema);

