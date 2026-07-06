import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useChatStore } from '@/stores/useChatStore';
const ChatHeader = ({ selecetedUser }) => {
    const onlineUsers = useChatStore(s => s.onlineUsers);
    return (_jsxs("div", { className: 'flex gap-2 items-center w-full  border-b-zinc-800 p-2', children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: selecetedUser.imageUrl }), _jsx(AvatarFallback, { children: selecetedUser.fullName[0] })] }), _jsxs("div", { children: [_jsx("h1", { className: 'text-sm text-gray-300 font-bold', children: selecetedUser.fullName }), _jsx("p", { className: 'text-[10px] italic', children: onlineUsers?.has(selecetedUser.clerkId) ? "online" : "offline" })] })] }));
};
export default ChatHeader;
