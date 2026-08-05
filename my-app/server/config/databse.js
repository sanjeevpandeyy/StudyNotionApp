const mongoose=require("mongoose");
require("dotenv").config();

const dbconnection=()=>{
  mongoose.connect(process.env.DATABASE_URL)
  .then(
    console.log("database connected successfully")
  ).catch((e)=>{
    console.log(e);
  
  })
}

module.exports=dbconnection;
