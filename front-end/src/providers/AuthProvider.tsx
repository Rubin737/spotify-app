import LoaderComponent from "@/helper/Loader";
import { setTokenGetter } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { updateApiToken } from "@/utils/updateApiToken";
import { useAuth } from "@clerk/react";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken,userId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const checkAdmin=useAuthStore(store=>store.checkAdmin);
  const initSocket=useChatStore(store=>store.initializeSocket);
  const disconnectSocket=useChatStore(store=>store.disconnectSocket)


  useEffect(() => {
    const initializeAuth = async () => {
       setTokenGetter(getToken);
      try {
        await checkAdmin();
        if(userId) initSocket(userId)
      } catch (error) {
        updateApiToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();

    return ()=>{
      disconnectSocket()
    }

  }, [getToken,userId,checkAdmin,initSocket]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return children;
};

export default AuthProvider;
