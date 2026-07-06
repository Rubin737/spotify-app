import cloudinary from "../lib/cloudinary.js";

export const cloudinaryUpload = async (file,resourceType="auto") => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: resourceType
    });

    return result
  } catch (error) {
    throw error;
  }
};
