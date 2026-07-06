import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useAdminStore } from "@/stores/useAdminStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash2Icon } from "lucide-react";
const AlbumTable = () => {
    const albums = useMusicStore(store => store.albums);
    const delAlbum = useAdminStore(store => store.deleteAlbum);
    const handleDeleteAlbum = (id) => {
        delAlbum(id);
    };
    return (_jsxs(Table, { children: [_jsx(TableHeader, { className: "hover:bg-zinc-800/50 border-b border-zinc-800", children: _jsxs(TableRow, { className: "hover:bg-zinc-800/50 ", children: [_jsx(TableHead, { className: "w-[50px]", children: "#" }), _jsx(TableHead, { children: "Title" }), _jsx(TableHead, { children: "Artist" }), _jsx(TableHead, { children: "Release Year" }), _jsx(TableHead, { children: "Songs" }), _jsx(TableHead, { children: "Actions" })] }) }), _jsx(TableBody, { className: "bg-zinc-900/50", children: albums?.map((album) => (_jsxs(TableRow, { className: "hover:bg-zinc-800/50", children: [_jsx(TableCell, { children: _jsx("img", { src: album.imageUrl, alt: "song-cover", className: "size-10 rounded-md object-cover" }) }), _jsx(TableCell, { className: "font-medium", children: album.title }), _jsx(TableCell, { children: album.artist }), _jsx(TableCell, { children: _jsxs("span", { className: "inline-flex items-center gap-1 text-gray-400", children: [_jsx(Calendar, { className: "size-4" }), album.releaseYear] }) }), _jsx(TableCell, { children: _jsxs("span", { className: "inline-flex items-center gap-1 text-gray-400", children: [_jsx(Music, { className: "size-4" }), album.songs.length, " Songs"] }) }), _jsx(TableCell, { children: _jsx("div", { className: "flex text-right gap-3", children: _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDeleteAlbum(album._id), className: "text-right cursor-pointer hover:text-red-300 p-2 rounded-lg text-red-400 hover:bg-red-400/10", children: _jsx(Trash2Icon, { className: "size-4" }) }) }) })] }, album._id))) })] }));
};
export default AlbumTable;
