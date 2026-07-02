import LoaderComponent from "@/helper/Loader";
import { setTokenGetter } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { updateApiToken } from "@/utils/updateApiToken";
import { useAuth } from "@clerk/react";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const checkAdmin=useAuthStore(store=>store.checkAdmin)

  useEffect(() => {
    const initializeAuth = async () => {
       setTokenGetter(getToken);
      try {
        await checkAdmin();
      } catch (error) {
        console.log(`Error in get token ${error}`);
        updateApiToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, [getToken]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return children;
};

export default AuthProvider;
