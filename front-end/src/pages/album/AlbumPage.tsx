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
import SongSectionSkeleton from "@/skeletons/SongLoadingSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { formatDuration } from "@/utils/formatDuration";
import { Clock, Music, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "../404/ErrorPage";

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

  if (isLoading) return <SongSectionSkeleton/>;
  if (error) return <ErrorPage/>;

  return (
    <div className="h-full rounded-md overflow-hidden lg:mx-3">
      <ScrollArea className="h-full">
        <div className="min-h-screen relative">
          <div className="absolute inset-0 bg-linear-to-b from-[#05038a]/80 via-zinc-900/80 to-zinc-900" />
          <div className="relative z-10">
            <div className="flex lg:p-6 p-3 lg:gap-x-6 gap-x-2 items-center">
              <img
                className="lg:size-[220px] size-[90px]  rounded-md shadow-lg object-cover"
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
              />
              <div className="lg:space-y-2 lg:pt-12">
                <p className="font-medium  lg:text-xl text-sm">Album</p>
                <h2 className="font-bold lg:text-6xl text-sm">{currentAlbum?.title}</h2>
                <div className="flex lg:gap-x-2 gap-x-1 text-[10px] lg:text-sm text-zinc-400">
                  <span className="font-medium">
                    {currentAlbum?.artist}
                  </span>
                  <span>•</span>
                  <span className="font-medium">
                    {currentAlbum?.songs?.length} Songs
                  </span>
                  <span>•</span>
                  <span className="font-medium">
                    {currentAlbum?.releaseYear}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="rounded-md lg:size-14 bg-green-500  hover:bg-green-500/50 hover:scale-105 transition-all"
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className="lg:size-6 size-3 text-black fill-black" />
                ) : (
                  <Play className="lg:size-6 size-3 text-black fill-black" />
                )}
              </Button>
            </div>

            <div className="lg:px-5 mt-5">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent text-xs font-bold lg:text-sm">
                    <TableHead className="lg:w-12">#</TableHead>
                    <TableHead>Song Title</TableHead>
                    <TableHead>Release Date</TableHead>
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
                        className="cursor-pointer group text-xs sm:text-lg border-transparent hover:bg-zinc-800/50"
                      >
                        <TableCell>
                          {isSongChanged && isPlaying ? (
                            <Music className="size-4 text-green-600 " />
                          ) : (
                            <>
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                              <Play className="size-4 hidden group-hover:block" />
                            </>
                          )}
                        </TableCell>
                        <TableCell className="overflow-x-hidden">
                          <div className="flex items-center lg:gap-x-3 gap-x-1 ">
                            <img
                              src={song.imageUrl}
                              alt="song cover"
                              className="lg:size-10 hidden lg:block size-7 rounded-md object-cover"
                            />
                            <div className="w-[130px]">
                              <div className="font-bold text-[10px] lg:text-sm">
                                {song.title}
                              </div>
                              <div className="text-[8px] text-zinc-400">
                                {song.artist}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-zinc-400 text-[10px] lg:text-sm">
                          {song.createdAt.split("T")[0]}
                        </TableCell>
                        <TableCell className="text-right text-zinc-400  text-[10px] lg:text-sm">
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