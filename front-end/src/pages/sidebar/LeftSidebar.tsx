import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlayListSkeleton from "@/skeletons/PlayListSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { Home, Library, MessageCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const albums = useMusicStore((store) => store.albums);
  const fetchAlbums = useMusicStore((store) => store.fetchAlbums);
  const isLoading = useMusicStore((store) => store.isLoading);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <section className="flex h-full flex-col text-white p-2 space-y-3">
      <div className="space-y-2 bg-zinc-800 rounded-xl p-2">
        <Button
          asChild
          className="border border-zinc-900 bg-zinc-700 w-full justify-start gap-2"
        >
          <Link to="/">
            <Home className="size-4" />
            Home
          </Link>
        </Button>

        <Button
          asChild
          className="border border-zinc-900 bg-zinc-700 w-full justify-start gap-2"
        >
          <Link to="/chat">
            <MessageCircleIcon className="size-4" />
            Messages
          </Link>
        </Button>
      </div>

      <div className="flex flex-1  flex-col bg-zinc-800 rounded-xl p-2">
         <div className="border inline-flex gap-2 px-2 py-1.5 bg-zinc-700 rounded-md text-sm items-center border-zinc-900 w-full">
          <Library className="size-4.5"/> Libary
         </div> 
        <ScrollArea className="flex-1 h-full mt-2">
          <div className="space-y-2">
            {isLoading ? (
              
              <PlayListSkeleton />
            ) : (
              albums.map((eachAlbum) => (
                <Link
                  key={eachAlbum._id}
                  to={`/album/${eachAlbum._id}`}
                  className="flex items-center gap-3 bg-zinc-900 p-2 rounded-md transition"
                >
                  <img
                    src={eachAlbum.imageUrl}
                    className="size-10 object-cover rounded-md"
                  />

                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold truncate">
                      {eachAlbum.title}
                    </p>
                    <p className="text-xs text-zinc-400 truncate">
                      Album •  {eachAlbum.artist}
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
