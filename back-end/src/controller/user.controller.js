import User from "../model/user.model.js"
import {getAuth} from "@clerk/express"
import { Message } from "../model/message.model.js";

export const getAllUsers=async(req,res,next)=>{
    const {userId}=getAuth(req);
    try {
        const users=await User.find({clerkId:{$ne:userId}});
        if(!users) return res.status(404).json({success:false,message:`Other Users not exist`})
        res.status(201).json({message:"Users",data:users,success:true})
    } catch (error) {
        next(error);
    }
}

export const getMessages=async(req,res,next)=>{
    try {
        const { userId: myId } = getAuth(req);
        const { userId } = req.params;
        const message=await Message.find({
            $or:[
                {
                    senderID:myId,receiverID:userId
                },
                {
                    receiverID:myId,senderID:userId
                }
            ]
        }).sort({createdAt:1})
        res.status(201).json({success:true,data:message})

    } catch (error) {
        next(error)
    }
}
