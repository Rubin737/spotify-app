import dotenv from "dotenv"
dotenv.config();
export const errorHandler=(err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    res.status(statusCode).json({success:false,message:process.env.NODE_ENV==="production"?"Internal Errrrrrrrrrrrrror":err.message})
}