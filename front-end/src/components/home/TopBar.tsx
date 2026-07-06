import SignInOAuthButton from "@/helper/SignInOAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUser, UserButton } from "@clerk/react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

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
          <Button asChild className="text-sm font-bold bg-zinc-700 border border-zinc-800">
          <Link to="/admin" className="">
            <LayoutDashboardIcon className="size-5 text-green-500" />
            Admin Dashboard
          </Link>
          </Button>
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