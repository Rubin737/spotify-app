import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { formatDuration } from "@/utils/formatDuration";
import { Clock, Music, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();

  const currentAlbum = useMusicStore((store) => store.currentAlbum);
  const fetchAlbumsById = useMusicStore((store) => store.fetchAlbumsById);
  const error = useMusicStore((store) => store.error);
  const isLoading = useMusicStore((store) => store.isLoading);
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const playAlbum = usePlayerStore((state) => state.playAlbum);

  useEffect(() => {
    if (albumId) fetchAlbumsById(albumId);
  }, [albumId]);


  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    const isSameSong = currentSong?._id === currentAlbum.songs[index]._id;
    if (isSameSong) togglePlay();
    else playAlbum(currentAlbum.songs, index);
  };

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;

    const isCurrentAlbumPlaying = currentAlbum.songs.some(
      (song) => song._id === currentSong?._id
    );

    if (isCurrentAlbumPlaying) {
      togglePlay();
    } else {
      playAlbum(currentAlbum.songs, 0);
    }
  };

  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <div className="h-full rounded-md overflow-hidden mx-3">
      <ScrollArea className="h-full">
        <div className="min-h-screen relative">
          <div className="absolute inset-0 bg-linear-to-b from-[#05038a]/80 via-zinc-900/80 to-zinc-900" />
          <div className="relative z-10">
            <div className="flex p-6 gap-x-6 items-center">
              <img
                className="size-[220px] rounded-md shadow-lg object-cover"
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
              />
              <div className="space-y-2 pt-12">
                <p className="font-medium text-xl">Album</p>
                <h2 className="font-bold text-6xl">{currentAlbum?.title}</h2>
                <div className="flex gap-x-2 text-zinc-400">
                  <span className="font-medium text-sm">
                    {currentAlbum?.artist}
                  </span>
                  <span>•</span>
                  <span className="font-medium text-sm">
                    {currentAlbum?.songs?.length} Songs
                  </span>
                  <span>•</span>
                  <span className="font-medium text-sm">
                    {currentAlbum?.releaseYear}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="rounded-full size-14 bg-primary hover:bg-primary/80 hover:scale-105 transition-all"
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className="size-6 text-black fill-black" />
                ) : (
                  <Play className="size-6 text-black fill-black" />
                )}
              </Button>
            </div>

            <div className="px-5 mt-5">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Released Date</TableHead>
                    <TableHead className="text-right">
                      <Clock className="h-4 w-4 inline-block" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAlbum?.songs.map((song, index) => {
                    const isSongChanged = currentSong?._id === song._id;
                    return (
                      <TableRow
                        onClick={() => handlePlaySong(index)}
                        key={song._id}
                        className="cursor-pointer group border-transparent hover:bg-zinc-800/50"
                      >
                        <TableCell>
                          {isSongChanged && isPlaying ? (
                            <Music className="size-4 text-primary" />
                          ) : (
                            <>
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                              <Play className="size-4 hidden group-hover:block" />
                            </>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-x-3">
                            <img
                              src={song.imageUrl}
                              alt="song cover"
                              className="size-10 rounded-md object-cover"
                            />
                            <div>
                              <div className="font-bold text-sm">
                                {song.title}
                              </div>
                              <div className="text-[12px] text-zinc-400">
                                {song.artist}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-zinc-400">
                          {song.createdAt.split("T")[0]}
                        </TableCell>
                        <TableCell className="text-right text-zinc-400">
                          {formatDuration(song.audioDuration)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;