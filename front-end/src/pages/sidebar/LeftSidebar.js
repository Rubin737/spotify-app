import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("section", { className: "flex h-full flex-col text-white p-2 space-y-3", children: [_jsxs("div", { className: "space-y-2 bg-zinc-800 rounded-xl p-2", children: [_jsx(Button, { asChild: true, className: "border border-zinc-900 bg-zinc-700 w-full justify-start gap-2", children: _jsxs(Link, { to: "/", children: [_jsx(Home, { className: "size-4" }), "Home"] }) }), _jsx(Button, { asChild: true, className: "border border-zinc-900 bg-zinc-700 w-full justify-start gap-2", children: _jsxs(Link, { to: "/chat", children: [_jsx(MessageCircleIcon, { className: "size-4" }), "Messages"] }) })] }), _jsxs("div", { className: "flex flex-1  flex-col bg-zinc-800 rounded-xl p-2", children: [_jsxs("div", { className: "border inline-flex gap-2 px-2 py-1.5 bg-zinc-700 rounded-md text-sm items-center border-zinc-900 w-full", children: [_jsx(Library, { className: "size-4.5" }), " Libary"] }), _jsx(ScrollArea, { className: "flex-1 h-full mt-2", children: _jsx("div", { className: "space-y-2", children: isLoading ? (_jsx(PlayListSkeleton, {})) : (albums.map((eachAlbum) => (_jsxs(Link, { to: `/album/${eachAlbum._id}`, className: "flex items-center gap-3 bg-zinc-900 p-2 rounded-md transition", children: [_jsx("img", { src: eachAlbum.imageUrl, className: "size-10 object-cover rounded-md" }), _jsxs("div", { className: "flex-1 overflow-hidden", children: [_jsx("p", { className: "text-xs font-bold truncate", children: eachAlbum.title }), _jsxs("p", { className: "text-xs text-zinc-400 truncate", children: ["Album \u2022  ", eachAlbum.artist] })] })] }, eachAlbum._id)))) }) })] })] }));
};
export default LeftSidebar;
