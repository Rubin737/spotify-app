import {Server} from "socket.io"
import { Message } from "../model/message.model.js";

export const initializeSocket=(httpServer)=>{
 const socketServer = new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
 })

  const userSockets=new Map();
  const userActivity=new Map();

  socketServer.on("connection",(socket)=>{
    socket.on("user_connected",(userId)=>{
        userSockets.set(userId,socket.id)
        userActivity.set(userId,"Idle")
                
        socketServer.emit("users_online",Array.from(userSockets.keys()));
        socketServer.emit("users_activity",Array.from(userActivity.entries()));
        socketServer.emit("new_user_connected", userId);
        
    })
    
    socket.on("updated_activity",({userId,activity})=>{
        userActivity.set(userId,activity);
        socketServer.emit("activity_updated",{userId,activity})
    })

    socket.on("send_message",async(data)=>{
        try {
            const {senderId,receiverId,content} = data
            const message=await Message.create({
                senderID:senderId,
                receiverID:receiverId,
                content
            })

            const receiverSocketId=userSockets.get(receiverId);
            if(receiverSocketId){
                socketServer.to(receiverSocketId).emit("receive_message",message)
            }

            socket.emit("message_send",message)
            
        } catch (error) {
            socket.emit("message_send",error.message) 
        }
    })

    socket.on("disconnet",()=>{
        let disconnectedUser;
        for(let[userId,socketId] of userSockets.entries()){
            if(socket.id===socketId){
                disconnectedUser=userId
                userSockets.delete(userId)
                userActivity.delete(userId)
                break;
            }
        }

        if(disconnectedUser){
           socketServer.emit("user_disconnected",disconnectedUser)
        }
    })

  })


}