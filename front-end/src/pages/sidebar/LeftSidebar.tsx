import { ScrollArea } from "@/components/ui/scroll-area";
import PlayListSkeleton from "@/helper/PlayListSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  // const { albums, isLoading, fetchAlbums } = useMusicStore();
  
  const albums = useMusicStore(store=>store.albums);
  const fetchAlbums = useMusicStore(store=>store.fetchAlbums);
  const isLoading = useMusicStore(store=>store.isLoading);
  
  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <section className="flex h-full flex-col text-white p-2 space-y-3">
      
      {/* Top Menu */}
      <div className="space-y-2 bg-zinc-800 rounded-xl p-2">
        <Link
          to="/"
          className="btn btn-ghost hover:btn-outline w-full rounded-md justify-start"
        >
          <HomeIcon className="size-4" />
          <span>Home</span>
        </Link>

        <Link
          to="/"
          className="btn btn-ghost hover:btn-outline rounded-md w-full justify-start"
        >
          <MessageCircleIcon className="size-4" />
          <span>Messages</span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col bg-zinc-800 rounded-xl p-2">
        
        <Link
          to="/"
          className="btn rounded-md btn-ghost hover:btn-outline w-full justify-start mb-2"
        >
          <Library className="size-4" />
          <span>Playlists</span>
        </Link>

        
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {isLoading ? (
              <PlayListSkeleton />
            ) : (
              albums.map((eachAlbum) => (
                <Link
                  key={eachAlbum._id}
                  to={`/album/${eachAlbum._id}`}
                  className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 p-2 rounded-md transition"
                >
                  <img
                    src={eachAlbum.imageUrl}
                    className="size-12 object-cover rounded-md"
                  />

                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">
                      {eachAlbum.title}
                    </p>
                    <p className="text-xs text-zinc-400 truncate">
                      Album ● {eachAlbum.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};

export default LeftSidebar;