import { jsx as _jsx } from "react/jsx-runtime";
import { useAdminStore } from '@/stores/useAdminStore';
import { Library, ListMusic, PlayCircle, Users2 } from 'lucide-react';
import StatCard from './StatCard';
const AdminStats = () => {
    const stats = useAdminStore(store => store.stats);
    const statsData = [
        {
            icon: ListMusic,
            label: "Total Songs",
            value: stats.totalSongs.toString(),
            bgColor: "bg-emerald-500/10",
            iconColor: "text-emerald-500",
        },
        {
            icon: Library,
            label: "Total Albums",
            value: stats.totalAlbums.toString(),
            bgColor: "bg-violet-500/10",
            iconColor: "text-violet-500",
        },
        {
            icon: Users2,
            label: "Total Artists",
            value: stats.totalArtists.toString(),
            bgColor: "bg-orange-500/10",
            iconColor: "text-orange-500",
        },
        {
            icon: PlayCircle,
            label: "Total Users",
            value: stats.totalUsers.toLocaleString(),
            bgColor: "bg-sky-500/10",
            iconColor: "text-sky-500",
        },
    ];
    return (_jsx("section", { className: 'mt-10 grid grid-cols-4 gap-3', children: statsData.map(stat => (_jsx(StatCard, { icon: stat.icon, value: stat.value, bgColor: stat.bgColor, iconColor: stat.iconColor, label: stat.label }, stat.label))) }));
};
export default AdminStats;
