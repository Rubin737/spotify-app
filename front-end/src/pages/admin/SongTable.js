import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useAdminStore } from "@/stores/useAdminStore";
import { Calendar, Trash2Icon } from "lucide-react";
const SongTable = () => {
    const songs = useAdminStore((Store) => Store.songs);
    const delSong = useAdminStore(store => store.deleteSong);
    const handleDeleteSong = (id) => {
        delSong(id);
    };
    return (_jsxs(Table, { children: [_jsx(TableHeader, { className: "hover:bg-zinc-800/50 border-b border-zinc-800", children: _jsxs(TableRow, { className: "hover:bg-zinc-800/50 ", children: [_jsx(TableHead, { className: "w-[50px]", children: "#" }), _jsx(TableHead, { children: "Title" }), _jsx(TableHead, { children: "Artist" }), _jsx(TableHead, { children: "Release Date" }), _jsx(TableHead, { children: "Actions" })] }) }), _jsx(TableBody, { className: "bg-zinc-900/50", children: songs?.map((song) => (_jsxs(TableRow, { className: "hover:bg-zinc-800/50", children: [_jsx(TableCell, { children: _jsx("img", { src: song.imageUrl, alt: "song-cover", className: "size-10 rounded-md object-cover" }) }), _jsx(TableCell, { className: "font-medium", children: song.title }), _jsx(TableCell, { children: song.artist }), _jsx(TableCell, { children: _jsxs("span", { className: "inline-flex items-center gap-1 text-gray-400", children: [_jsx(Calendar, { className: "size-4" }), song.createdAt.split("T")[0]] }) }), _jsx(TableCell, { children: _jsx("div", { className: "flex text-right gap-3", children: _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDeleteSong(song._id), className: "text-right cursor-pointer hover:text-red-300 p-2 rounded-lg text-red-400 hover:bg-red-400/10", children: _jsx(Trash2Icon, { className: "size-4" }) }) }) })] }, song._id))) })] }));
};
export default SongTable;
