import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useChatStore } from '@/stores/useChatStore'
import React from 'react'

const ChatHeader = ({selecetedUser}) => {

    const onlineUsers=useChatStore(s=>s.onlineUsers)

  return (
    <div className='flex gap-2 items-center w-full  border-b-zinc-800 p-2'>
      <Avatar>
        <AvatarImage src={selecetedUser.imageUrl} className='lg:size-5'/>
        <AvatarFallback>{selecetedUser.fullName[0]}</AvatarFallback>
      </Avatar> 
      <div>
        <h1 className='lg:text-sm text-xs text-gray-300 lg:font-bold font-medium'>{selecetedUser.fullName}</h1>
        <p className='text-[10px] italic'>{onlineUsers?.has(selecetedUser.clerkId) ? "online" : "offline"}</p>
     </div>
    </div>
  )
}

export default ChatHeader