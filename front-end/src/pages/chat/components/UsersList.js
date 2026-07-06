import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarBadge, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import UsersListSkeleton from '@/skeletons/UsersListSkeleton';
import { useChatStore } from '@/stores/useChatStore';
const UsersList = () => {
    const isLoading = useChatStore(store => store.isUserLoading);
    const onlineUsers = useChatStore(store => store.onlineUsers);
    const selectedUser = useChatStore(store => store.selectedUser);
    const setSelectedUser = useChatStore(store => store.setSelectedUser);
    const users = useChatStore(s => s.users);
    return (_jsx("div", { className: 'border-r px-2 border-r-zinc-700 ', children: _jsx(ScrollArea, { className: 'h-[calc(100vh-280px)]', children: _jsx("div", { children: isLoading === false ? (users.map(user => (_jsxs("div", { onClick: () => {
                        setSelectedUser(user);
                    }, className: `flex mt-2 gap-3 cursor-pointer p-2 hover:bg-zinc-900/50 items-center ${selectedUser?.clerkId === user.clerkId ? "bg-zinc-900/50" : "bg-zinc-950/50"}`, children: [_jsxs(Avatar, { className: `size-10 p-1 ${onlineUsers?.has(user.clerkId) ? "bg-green-600 dark:bg-green-800" : "bg-zinc-300"} `, children: [_jsx(AvatarImage, { src: user.imageUrl }), _jsx(AvatarBadge, { className: ` ${onlineUsers?.has(user.clerkId) ? "bg-green-600 dark:bg-green-800" : "bg-zinc-300"}` })] }), _jsxs("div", { children: [_jsx("h1", { className: 'text-sm text-gray-300 font-bold', children: user.fullName }), _jsx("p", { className: 'text-[10px] italic', children: onlineUsers?.has(user.clerkId) ? "online" : "offline" })] })] }, user._id)))) : (_jsx(UsersListSkeleton, {})) }) }) }));
};
export default UsersList;
