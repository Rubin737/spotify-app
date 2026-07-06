import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatStore } from '@/stores/useChatStore';
import { useUser } from '@clerk/react';
import { Send } from 'lucide-react';
import { useState } from 'react';
const ChatInput = () => {
    const { user } = useUser();
    const selectedUser = useChatStore(s => s.selectedUser);
    const sendMsg = useChatStore(s => s.sendMessage);
    const [newMsg, setNewMsg] = useState("");
    const handleSend = () => {
        if (!newMsg || !user || !selectedUser)
            return;
        sendMsg(user.id, selectedUser.clerkId, newMsg.trim());
        setNewMsg("");
    };
    return (_jsxs("div", { className: 'flex items-center gap-2 px-5', children: [_jsx(Input, { value: newMsg, onChange: (event) => setNewMsg(event.target.value), onKeyDown: (event) => {
                    if (event.key === "Enter") {
                        handleSend();
                    }
                }, placeholder: 'Type a message...', className: 'border-zinc-600 placehoder-text-xs focus-visible:ring-0 ' }), _jsx(Button, { onClick: handleSend, disabled: !newMsg.trim(), size: 'icon', className: 'bg-green-800\n        cursor-pointer ', children: _jsx(Send, { className: 'size-4' }) })] }));
};
export default ChatInput;
