import { UserButton } from "@clerk/react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className="flex justify-between bg-zinc-800 p-3 rounded-xl">
      <div className="flex items-center gap-3">
        <Link to={"/"}>
          <img src="/spotify.png" alt="spotify-img" className="size-9" />
        </Link>
        <div>
          <p className="text-lg font-bold">Music Manager</p>
          <p className="text-md text-gray-300">Manage your music catalog</p>
        </div>
      </div>
      <div className="rounded-full">
        <UserButton/>
      </div>
    </header>
  );
};

export default AdminHeader;
