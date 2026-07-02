import mongoose from "mongoose";

const messageSchema=mongoose.model({
    senderID:{
        type:String,
        required:true
    },
    receiverID:{
        type:String,
        required:true
    }
    
},{timestaps:true})

export const Message=mongoose.model("Message",messageSchema)