import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {

 const {user,isLoaded}=useUser();
 const navigate=useNavigate();
 const userCreateAttemept=useRef(false);

 useEffect(()=>{
  const createUserInDB=async()=>{
    if(!isLoaded || !user || userCreateAttemept.current) return
    userCreateAttemept.current=true
    try {
      const newUser=await axiosInstance.post("/auth/callback",{
        id:user.id,
        fullName:user.fullName,
        imageUrl:user.imageUrl
      })
    } catch (error) {
      //
    }
    finally{
      navigate("/")
    }
  }
  createUserInDB()
 },[isLoaded,user,navigate])
 


 return <div className="h-screen w-full flex justify-center items-center bg-black">
    <div className="bg-zinc-800/50 shadow-sm shadow-zinc-800 lg:gap-y-2 gap-y-1 lg:px-24 px-10 rounded-2xl py-3  flex items-center flex-col justify-center">
      <Loader className="animate-spin text-emerald-500"/>
      <h1 className="lg:text-lg text-sm font-semibold lg:font-bold">Logging You in.</h1>
      <h3 className="lg:text-sm text-xs">Redirecting....</h3>
    </div>
  </div>;
};

export default AuthCallback;
 