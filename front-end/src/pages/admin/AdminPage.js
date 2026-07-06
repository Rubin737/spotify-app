import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminStats from "./AdminStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import { useMusicStore } from "@/stores/useMusicStore";
import { useAdminStore } from "@/stores/useAdminStore";
import SongContent from "./SongContent";
import AlbumContent from "./AlbumContent";
const AdminPage = () => {
    const isLoading = useAuthStore((store) => store.isLoading);
    const isAdmin = useAuthStore((store) => store.isAdmin);
    const fetchAlbum = useMusicStore(store => store.fetchAlbums);
    const fetchSongs = useAdminStore(store => store.fetchSongs);
    const fetchStats = useAdminStore(store => store.fetchStats);
    useEffect(() => {
        fetchAlbum();
        fetchSongs();
        fetchStats();
    }, [fetchAlbum, fetchSongs, fetchStats]);
    if (!isAdmin && !isLoading)
        return _jsx(_Fragment, { children: "You are not a admin" });
    return (_jsx("section", { className: "min-h-screen  bg-gradient-b from-zinc-900  via-zinc-900 to-black", children: _jsxs("div", { className: "p-8", children: [_jsx(AdminHeader, {}), _jsx(AdminStats, {}), _jsxs(Tabs, { defaultValue: "songs", className: "w-full flex flex-col my-5", children: [_jsxs(TabsList, { className: "flex gap-1 bg-zinc-800/50 p-1 border-zinc-900", children: [_jsxs(TabsTrigger, { className: "data-[state=active]:bg-zinc-600 px-1 text-md font-medium cursor-pointer", value: "songs", children: [_jsx(Music, { className: "size-4 mr-0.5" }), "Songs"] }), _jsxs(TabsTrigger, { className: "data-[state=active]:bg-zinc-600 px-2 text-md font-medium cursor-pointer", value: "albums", children: [_jsx(Album, { className: "size-4 mr-0.5" }), "Albums"] })] }), _jsx(TabsContent, { value: "songs", children: _jsx(SongContent, {}) }), _jsx(TabsContent, { value: "albums", children: _jsx(AlbumContent, {}) })] })] }) }));
};
export default AdminPage;
