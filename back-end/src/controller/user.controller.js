import User from "../model/user.model.js"
import {getAuth} from "@clerk/express"
export const getAllUsers=async(req,res,next)=>{
    const {userId}=getAuth(req);
    console.log(userId);
    try {
        const users=await User.find({clerkId:{$ne:userId}});
        if(!users) return res.status(404).json({success:false,message:`Other Users not exist`})
        res.status(201).json({message:"Users",data:users,success:true})
    } catch (error) {
        console.log("Error in getting users");
        next(error);
    }
}
