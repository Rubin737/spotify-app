import cloudinary from "../lib/cloudinary.js";

export const cloudinaryUpload = async (file,resourceType="auto") => {
  console.log(resourceType);
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: resourceType
    });

    return result
  } catch (error) {
    console.log("========== FULL ERROR ==========");
    console.dir(error, { depth: null });
    console.log("================================");
    throw error;
  }
};
