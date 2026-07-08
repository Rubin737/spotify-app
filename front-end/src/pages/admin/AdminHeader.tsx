import { UserButton } from "@clerk/react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className="flex justify-between lg:bg-zinc-800 lg:p-3  lg:rounded-xl">
      <div className="flex items-center gap-3">
        <Link to={"/"}>
          <img src="/spotify.png" alt="spotify-img" className="lg:size-9 size-7" />
        </Link>
        <div>
          <p className="lg:text-lg text-sm font-bold">Music Manager</p>
          <p className="text-md text-xs text-gray-300">Manage your music catalog</p>
        </div>
      </div>
      <div className="rounded-full">
        <UserButton/>
      </div>
    </header>
  );
};

export default AdminHeader;
