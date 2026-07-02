import cloudinary from "./src/lib/cloudinary.js";

try {
  const result = await cloudinary.uploader.upload("./1.jpg");
  console.log(result);
} catch (error) {
  console.log("Name:", error.name);
  console.log("Message:", error.message);
  console.log("HTTP:", error.http_code);

  if (error.response) {
    console.dir(error.response, { depth: null });
  }

  if (error.error) {
    console.dir(error.error, { depth: null });
  }

  console.dir(error, { depth: null });
}