const coludinary=require("cloudinary").v2;
require("dotenv").config();


exports.coludinaryConnect=()=>{
  try{
    coludinary.config({
      cloud_name:process.env.CLOUD_NAME,
      api_key:process.env.API_KEY,
      api_secret:process.env.API_SECRET,
    })

  }catch(e){
    console.log("error on connecting cloudinary")
    console.log(e);
  }

}
