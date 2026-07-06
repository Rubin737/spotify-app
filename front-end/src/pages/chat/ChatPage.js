import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TopBar from '@/components/home/TopBar';
import { useChatStore } from '@/stores/useChatStore';
import { useUser } from '@clerk/react';
import { useEffect } from 'react';
import UsersList from './components/UsersList';
import NoUsers from './components/NoUsers';
import ChatHeader from './components/ChatHeader';
import ChatBody from './components/ChatBody';
import ChatInput from './components/ChatInput';
import NoConversation from './components/NoConversation';
const ChatPage = () => {
    const { user } = useUser();
    const fetchMsgs = useChatStore(store => store.fetchMessages);
    const selectedUser = useChatStore(store => store.selectedUser);
    const fetchUsers = useChatStore(store => store.fetchUsers);
    const users = useChatStore(store => store.users);
    useEffect(() => {
        if (user)
            fetchUsers();
    }, [fetchUsers, user]);
    useEffect(() => {
        if (selectedUser)
            fetchMsgs(selectedUser.clerkId);
    }, [selectedUser, fetchMsgs]);
    return (_jsxs("section", { className: 'h-full bg-gradient-b from-zinc-600 to-zinc-900 rounded-lg overflow-hidden\n     border-zinc-700', children: [_jsx("div", { className: 'pt-3', children: _jsx(TopBar, {}) }), users?.length !== 0 ? (_jsxs("div", { className: 'grid p-2 lg:grid-cols-[200px_1fr] grid-cols-[50px_1fr] h-[calc(100vh-180px)]', children: [_jsx(UsersList, {}), _jsx("div", { className: 'min-h-0', children: selectedUser ? (_jsxs("div", { className: 'flex h-full flex-col py-3', children: [_jsx(ChatHeader, { selecetedUser: selectedUser }), _jsx("div", { className: 'min-h-0 flex-1', children: _jsx(ChatBody, {}) }), _jsx(ChatInput, {})] })) : (_jsx(NoConversation, {})) })] })) :
                (_jsx(NoUsers, {}))] }));
};
export default ChatPage;
