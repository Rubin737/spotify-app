import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUser } from '@clerk/react';
import { Music4, Users } from 'lucide-react';
import { useEffect } from 'react';
import { LoginPrompt } from './LoginPrompt';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/stores/useChatStore';
const FriendsPage = () => {
    const fetchUsers = useChatStore(store => store.fetchUsers);
    const users = useChatStore(store => store.users);
    const onlineUsers = useChatStore(s => s.onlineUsers);
    const userActivity = useChatStore(s => s.userActivities);
    const { user } = useUser();
    useEffect(() => {
        if (user)
            fetchUsers();
    }, [user, fetchUsers]);
    return (_jsxs("section", { className: 'h-full rounded-md bg-zinc-800 p-3 flex flex-col', children: [_jsx("div", { children: _jsxs("div", { className: 'flex justify-start items-center text-sm  font-bold border-b pb-1.5', children: [_jsx(Users, { className: 'size-6 shrink-0' }), _jsx("span", { children: "What they're listening to" })] }) }), !user && _jsx(LoginPrompt, {}), _jsx(ScrollArea, { className: 'flex-1 p-3', children: _jsx("div", { className: 'flex flex-col gap-y-2', children: users?.map((user) => {
                        const activity = userActivity.get(user.clerkId);
                        const isPlaying = activity && activity !== "Idle";
                        return (_jsxs("div", { className: 'flex gap-3 items-center justify-start', children: [_jsxs(Avatar, { className: 'size-10', children: [_jsx(AvatarImage, { src: user.imageUrl, alt: "@shadcn" }), _jsx(AvatarFallback, { children: user.fullName[0] }), _jsx(AvatarBadge, { className: `${onlineUsers?.has(user.clerkId) ? "bg-green-500" : "bg-zinc-600"}` })] }), _jsxs("div", { className: 'flex-1 flex flex-col', children: [_jsxs("span", { className: 'flex gap-2 font-medium text-sm', children: [user.fullName.split(" ")[0], " ", isPlaying && _jsx(Music4, { className: 'size-4 text-green-500 animate-pulse text-primary' })] }), isPlaying ? (_jsxs("div", { className: 'flex flex-col', children: [_jsx("span", { className: 'text-xs font-bold', children: activity.split("by")[0] }), _jsx("span", { className: 'font-bold italic text-[10px] text-zinc-500', children: activity.split("by")[1] })] })) : _jsx("span", { className: 'font-bold text-xs text-zinc-500', children: "Idle" })] })] }, user._id));
                    }) }) })] }));
};
export default FriendsPage;
