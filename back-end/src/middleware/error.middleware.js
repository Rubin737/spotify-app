import dotenv from "dotenv"
dotenv.config();
export const errorHandler=(err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    console.log(err.message,"this is the error")
    res.status(statusCode).json({success:false,message:process.env.NODE_ENV==="production"?"Internal Errrrrrrrrrrrrror":err.message})
}