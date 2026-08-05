const SubSection=require("../model/Subsection");
const Section=require("../model/Section");
const uploadImageToCloudinary=require("../utils/ImageUploader");
require("dotenv").config();

//create subsection

exports.createSubSection = async (req, res) => {
  try {
    const {
      sectionId,
      title,
      timeDuration,
      description,
    } = req.body;

    console.log("Section ID:", sectionId);

    const video = req.files?.video;


    // Validation
    if (
      !sectionId ||
      !title ||
      !timeDuration ||
      !description ||
      !video
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }


    // Check section exists
    const isValidSection = await Section.findById(sectionId);

    if (!isValidSection) {
      return res.status(404).json({
        success: false,
        message: "Invalid section",
      });
    }


    // Upload video
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );


    // Create subsection
    const newSubSection = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadDetails.secure_url,
    });


    // Add subsection into section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      {
        new: true,
      }
    )
      .populate("subSection")
      .exec();



    return res.status(200).json({
      success: true,
      message: "Sub-section created successfully",
      data: updatedSection,
    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong, please create sub-section again",
    });
  }
};


//update subsection

exports.updateSubSection=async(req,res)=>{
  try{

    const {subSectionId,title,timeDuration,description}=req.body;
    const video=req.files?.video;

    if(!subSectionId){
      return res.status(403).json({
        success:false,
        message:"subsection id not fetched,please try again for updation of subsection"
      })
    }
    if(!title && !timeDuration && !description && !video ){
      return res.status(403).json({
        success:false,
        message:"please filed what you want to update"
      })
    }
    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (timeDuration) updateData.timeDuration = timeDuration;
    
    if (video) {
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        );
        updateData.videoUrl = uploadDetails.secure_url;
    }
    
    const updatedSubSection = await SubSection.findByIdAndUpdate(
        subSectionId,
        updateData,
        { new: true }
    );
  
    return res.status(200).json({
      success:true,
      message:"sub-section updated successfully",
    })

  }catch(e){
    console.log(e);
    return res.status(500).json({
      success:false,
      message:"something went wrong ,please update sub-section again"
    })
  }
}

exports.deleteSubSection=async(req,res)=>{
  try{

    const{subSectionId,sectionId}=req.body;
  if(!subSectionId||!sectionId){
    return res.status(403).json({
      success:false,
      message:"something went wrong during passing subSectionId or sectionId",
    })
  }

  const updatedSection=await Section.findByIdAndUpdate(sectionId,{
    $pull:{
      subSection:subSectionId,
    }
  },{new:true});

  const deletedSubSectionDetails=await SubSection.findByIdAndDelete(subSectionId);
  return res.status(200).json({
    success:true,
    message:"sub-section deleted successfully",
  })

  }catch(e){
    console.log(e);
    return res.status(500).json({
      success:false,
      message:"something went wrong ,please delete sub-section again"
    })
  }
  
}

