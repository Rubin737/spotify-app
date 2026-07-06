import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/stores/useChatStore';
import { useUser } from '@clerk/react';
import { useEffect, useRef } from 'react';
const ChatBody = () => {
    const messages = useChatStore(s => s.message);
    const selectedUser = useChatStore(s => s.selectedUser);
    const { user } = useUser();
    const bottomRef = useRef(null);
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        const isOwnMessage = lastMessage?.senderID === user?.id;
        bottomRef.current?.scrollIntoView({ behavior: isOwnMessage ? "auto" : "smooth" });
    }, [messages]);
    return (_jsx(ScrollArea, { className: 'h-full', children: _jsxs("div", { className: "p-5 flex flex-col gap-y-3", children: [messages.length !== 0 ? (messages.map((message) => {
                    const isOwnMessage = message.senderID === user?.id;
                    return (_jsxs("div", { className: `flex items-end gap-x-2 ${isOwnMessage ? "flex-row-reverse self-end" : "self-start"} min-w-0 max-w-[70%]`, children: [_jsxs(Avatar, { className: "size-6 shrink-0", children: [_jsx(AvatarImage, { src: isOwnMessage ? user?.imageUrl : selectedUser?.imageUrl }), _jsx(AvatarFallback, { children: isOwnMessage ? user?.fullName?.[0] : selectedUser?.fullName?.[0] })] }), _jsxs("div", { children: [_jsx("div", { className: `px-3 py-2  min-w-0 wrap-break-word whitespace-pre-wrap rounded-2xl text-xs  ${isOwnMessage
                                            ? "bg-green-500 text-white rounded-br-sm"
                                            : "bg-zinc-700 text-zinc-100 rounded-bl-sm"}`, children: _jsx("p", { className: 'wrap-break-word', children: message.content }) }), message.createdAt && (_jsx("span", { className: `block mt-1 text-[10px] ${isOwnMessage ? "text-green-100 text-end" : "text-zinc-400"}`, children: new Date(message.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        }) }))] })] }, message._id));
                })) : (_jsxs("div", { className: "flex text-xs text-black w-[50%] p-2 bg-green-500 flex-col border rounded-md", children: [_jsx("p", { children: "\uD83D\uDC4B Welcome!" }), _jsxs("p", { children: ["This is the beginning of your conversation with", " ", selectedUser?.fullName || "this person", ". Send a message to get things started."] })] })), _jsx("div", { ref: bottomRef })] }) }));
};
export default ChatBody;
