import SignInOAuthButton from "@/helper/SignInOAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUser, UserButton } from "@clerk/react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const {isAdmin} = useAuthStore();
  if (!isLoaded) return null;

  return (
    <header className="flex p-4 bg-zinc-800 rounded-md sticky z-10 backdrop-blur-md justify-between mx-3">
      <div>
        <img src="/spotify.png" alt="spotify-logo" className="size-8" />
      </div>

      <div className="flex items-center gap-2">
        {isAdmin && (
          <Link to="/admin" className="flex gap-1.5 items-center btn btn-sm hover:scale-105 rounded-md">
            <LayoutDashboardIcon className="size-5 text-secon text-primary font-bold" />
            <span className="font-bold text-sm">Admin Dashboard</span>
          </Link>
        )} 
        
        {isSignedIn ? (
          <UserButton/>
        ) : (
          <SignInOAuthButton />
        )}

        
      </div>
    </header>
  );
};
export default TopBar