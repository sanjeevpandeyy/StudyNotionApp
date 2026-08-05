const cloudinary = require("cloudinary").v2;

const uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = {
    folder,
    resource_type: "auto",
  };

  if (height) {
    options.height = height;
  }

  if (quality) {
    options.quality = quality;
  }

  const uploadedImage = await cloudinary.uploader.upload(
    file.tempFilePath,
    options
  );

  return uploadedImage;
};

module.exports = uploadImageToCloudinary;