import { axiosInstance } from "@/lib/axios"

export const updateApiToken=(token:string | null)=>{
    if(token!==null){
        axiosInstance.defaults.headers.common["Authorization"]=`Bearer ${token}`
        console.log(axiosInstance.defaults.headers.common["Authorization"]);
    } 
        
    else delete axiosInstance.defaults.headers.common["Authorization"]
}