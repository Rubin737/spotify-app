import TopBar from '@/components/home/TopBar';
import { useChatStore } from '@/stores/useChatStore';
import { useUser } from '@clerk/react'
import React, { useEffect } from 'react'
import UsersList from './components/UsersList';
import NoUsers from './components/NoUsers';
import ChatHeader from './components/ChatHeader';
import ChatBody from './components/ChatBody';
import ChatInput from './components/ChatInput';
import NoConversation from './components/NoConversation';

const ChatPage = () => {

  const {user} = useUser();
  const fetchMsgs=useChatStore(store=>store.fetchMessages);
  const selectedUser=useChatStore(store=>store.selectedUser);
  const fetchUsers=useChatStore(store=>store.fetchUsers);
  const users=useChatStore(store=>store.users);
  

  useEffect(()=>{
    if(user) fetchUsers()
  },[fetchUsers,user])

 useEffect(()=>{
  if(selectedUser) fetchMsgs(selectedUser.clerkId)
 },[selectedUser,fetchMsgs])

  return (
    <section className='h-full bg-gradient-b from-zinc-600 to-zinc-900 rounded-lg overflow-hidden
     border-zinc-700'>
      <div className='pt-3'>
      <TopBar/>
      </div>
      {
        users?.length!==0 ? (
        <div className='grid p-2 lg:grid-cols-[200px_1fr]  grid-cols-[50px_1fr] lg:h-[calc(100vh-180px)] h-full'>
            <UsersList/>
            <div className='min-h-0'>
              {
                selectedUser ? (
                  <div className='flex h-full flex-col lg:py-3'>
                    <ChatHeader selecetedUser={selectedUser}/>
                    <div className='min-h-0 flex-1'>
                      <ChatBody/>
                    </div>
                    <ChatInput/>
                  </div>
                ) : (<NoConversation/>)
              }
            </div>
        </div>
        ) : 
        (
          <NoUsers/>
        )
      }
    </section>
  )
}

export default ChatPage