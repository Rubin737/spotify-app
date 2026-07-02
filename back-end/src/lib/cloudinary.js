import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary

// console.log({
//   cloudName: process.env.CLOUD_NAME,
//   apiKey: process.env.CLOUDINARY_API_KEY,
//   apiSecret: process.env.CLOUDINARY_API_SECRET,
// });

// cloudinary.api.ping().then(console.log).catch(console.error);





