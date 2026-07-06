import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
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
        if (albumId)
            fetchAlbumsById(albumId);
    }, [albumId]);
    const handlePlaySong = (index) => {
        if (!currentAlbum)
            return;
        const isSameSong = currentSong?._id === currentAlbum.songs[index]._id;
        if (isSameSong)
            togglePlay();
        else
            playAlbum(currentAlbum.songs, index);
    };
    const handlePlayAlbum = () => {
        if (!currentAlbum)
            return;
        const isCurrentAlbumPlaying = currentAlbum.songs.some((song) => song._id === currentSong?._id);
        if (isCurrentAlbumPlaying) {
            togglePlay();
        }
        else {
            playAlbum(currentAlbum.songs, 0);
        }
    };
    if (isLoading)
        return _jsx(_Fragment, { children: "Loading" });
    if (error)
        return _jsx(_Fragment, { children: "Error" });
    return (_jsx("div", { className: "h-full rounded-md overflow-hidden mx-3", children: _jsx(ScrollArea, { className: "h-full", children: _jsxs("div", { className: "min-h-screen relative", children: [_jsx("div", { className: "absolute inset-0 bg-linear-to-b from-[#05038a]/80 via-zinc-900/80 to-zinc-900" }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex p-6 gap-x-6 items-center", children: [_jsx("img", { className: "size-[220px] rounded-md shadow-lg object-cover", src: currentAlbum?.imageUrl, alt: currentAlbum?.title }), _jsxs("div", { className: "space-y-2 pt-12", children: [_jsx("p", { className: "font-medium text-xl", children: "Album" }), _jsx("h2", { className: "font-bold text-6xl", children: currentAlbum?.title }), _jsxs("div", { className: "flex gap-x-2 text-zinc-400", children: [_jsx("span", { className: "font-medium text-sm", children: currentAlbum?.artist }), _jsx("span", { children: "\u2022" }), _jsxs("span", { className: "font-medium text-sm", children: [currentAlbum?.songs?.length, " Songs"] }), _jsx("span", { children: "\u2022" }), _jsx("span", { className: "font-medium text-sm", children: currentAlbum?.releaseYear })] })] })] }), _jsx("div", { className: "px-6", children: _jsx(Button, { onClick: handlePlayAlbum, size: "icon", className: "rounded-full size-14 bg-primary hover:bg-primary/80 hover:scale-105 transition-all", children: isPlaying &&
                                        currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (_jsx(Pause, { className: "size-6 text-black fill-black" })) : (_jsx(Play, { className: "size-6 text-black fill-black" })) }) }), _jsx("div", { className: "px-5 mt-5", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "border-zinc-800 hover:bg-transparent", children: [_jsx(TableHead, { className: "w-12", children: "#" }), _jsx(TableHead, { children: "Title" }), _jsx(TableHead, { children: "Released Date" }), _jsx(TableHead, { className: "text-right", children: _jsx(Clock, { className: "h-4 w-4 inline-block" }) })] }) }), _jsx(TableBody, { children: currentAlbum?.songs.map((song, index) => {
                                                const isSongChanged = currentSong?._id === song._id;
                                                return (_jsxs(TableRow, { onClick: () => handlePlaySong(index), className: "cursor-pointer group border-transparent hover:bg-zinc-800/50", children: [_jsx(TableCell, { children: isSongChanged && isPlaying ? (_jsx(Music, { className: "size-4 text-primary" })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: "group-hover:hidden", children: index + 1 }), _jsx(Play, { className: "size-4 hidden group-hover:block" })] })) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-x-3", children: [_jsx("img", { src: song.imageUrl, alt: "song cover", className: "size-10 rounded-md object-cover" }), _jsxs("div", { children: [_jsx("div", { className: "font-bold text-sm", children: song.title }), _jsx("div", { className: "text-[12px] text-zinc-400", children: song.artist })] })] }) }), _jsx(TableCell, { className: "text-zinc-400", children: song.createdAt.split("T")[0] }), _jsx(TableCell, { className: "text-right text-zinc-400", children: formatDuration(song.audioDuration) })] }, song._id));
                                            }) })] }) })] })] }) }) }));
};
export default AlbumPage;
