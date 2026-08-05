const Category=require("../model/category"); //category because i create by mistake category before cotegry 
const Course=require("../model/Course");

exports.createCategory=async(req,res)=>{
  try{
    const {name,description}=req.body;
    if(!name||!description){
      return res.status(403).json({
        success: false, 
         message:" all fields are required",
        })
    }

    const categoryDetails=Category.create({name,description});

    console.log(categoryDetails);

    return res.status(200).json({
       success: true, 
       message: "Category created successfully",
      })
} 
catch(e){
    return res.status(500).json({
          success: false, 
           message: e.message,
          })
  }      

}



//get all Category

exports.showAllCategory=async(req,res)=>{
  try{

    const allCategory=await Category.find({},{name:true,description:true});
    return res.status(200).json({
      success: true, 
      message: "All Category fetched successfully",
      allCategory
     })

  }catch(e){
    return res.status(500).json({
      success: false, 
       message: e.message,
    });
  }
}

//get courses  diffrent categories like selectedCategoryCourses,getDifferentCategories,topSellingCourses
exports.categoryPageDetails=async(req,res)=>{
  try{
    //get category id
    const {categoryId}=req.body;
    //get courses for specified category id
    const selectedCategoryCourses=await Category.findById(categoryId)
                                       .populate("course")
                                       .exec();
    //validation
    if(!selectedCategoryCourses){
      return res.status(404).json({
        success:false,
        message:"data not found",
      })
    }
    //get courses for diffrent categories
    const getDifferentCategories=await Category.find({_id:{$ne:categoryId},})
                                        .populate("course")
                                        .exec();
    //get top selling courses which course id not same

    const topSellingCourses=await Course.aggregate([
      {
        $match: {
          _id: { $ne: categoryId }
        }
      },
      {
        $addFields: {
          totalStudentsEnrolled: {
            $size: "$studentEnrolled"
          }
        }
      },
      {
        $sort: {
          totalStudentsEnrolled: -1
        }
      },
      {
        $limit: 10
      }
    ]);
    //return response
    return res.status(200).json({
      success: true, 
      message: "Tag created successfully",
      data:{
        selectedCategoryCourses,
        getDifferentCategories,
        topSellingCourses,
      }
     })
    

  }catch(e){
    console.log(e);
    return res.status(500).json({
      success: false, 
       message: e.message,
    });
  }
}

