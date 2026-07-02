import { axiosInstance } from "@/lib/axios";
import { UserStore } from "@/types/types";
import { create } from "zustand";

export const useUserStore=create<UserStore>((set)=>(
    {
        users:[],
        isLoading:false,
        error:null,
        fetchUsers:async()=>{
            set({isLoading:true})
            try {
                const respone=await axiosInstance.get("/user/get-all-users");
                set({users:respone.data.data})
            } catch (error:any) {
                console.log(error);
                set({error:error.response.data.message}) 
            }
            finally{
                set({isLoading:false})
            }
        }
        
    }  
))
