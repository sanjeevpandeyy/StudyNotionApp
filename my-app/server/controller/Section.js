const Section=require("../model/Section");
const Course=require("../model/Course");


exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create section
    const newSection = await Section.create({
      sectionName,
    });

    // Update course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedCourse,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};

exports.updateSection=async(req,res)=>{
  try{
    const {sectionName,sectionId}=req.body;
    if(!sectionName||!sectionId){
      return res.status(403).json({
        success:false,
        message:"All field required"
      })
    }
    const updateSection=await Section.findByIdAndUpdate({_id:sectionId},{
      sectionName:sectionName,
    },{new:true});

    return res.status(200).json({
      success:true,
      message:"section updated successfully"
    })

  }catch(e){
    console.log(e);
    return res.status(500).json({
      success:false,
      message:"something went wrong ,please update section again"
    })
  }
}



exports.deleteSection=async(req,res)=>{
  try{

    const{sectionId,courseId}=req.body;

    const updatedCourse=await Course.findByIdAndUpdate(courseId,{
      $pull:{
        courseContent:sectionId,
      }
    })
    const deletedSection=await Section.findOneAndDelete(sectionId);
  




    return res.status(200).json({
      success:true,
      message:"section deleted successfully"
    })
  }catch(e){
    console.log(e);
    return res.status(500).json({
      success:false,
      message:"something went wrong ,please delete section again"
    })
  }
}