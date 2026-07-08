import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChatStore } from '@/stores/useChatStore'
import { useUser } from '@clerk/react'
import { Send } from 'lucide-react'
import { useState } from 'react'

const ChatInput = () => {

  const {user}=useUser();
  const selectedUser=useChatStore(s=>s.selectedUser);
  const sendMsg=useChatStore(s=>s.sendMessage)
  
  const [newMsg,setNewMsg]=useState("");

  const handleSend=()=>{
    if(!newMsg|| !user || !selectedUser) return
    sendMsg(user.id,selectedUser.clerkId,newMsg.trim())
    setNewMsg("")
  }

  return (
    <div className='flex items-center lg:gap-2 gap-1 lg:px-5'>
        <Input 
        value={newMsg}
        onChange={(event)=>setNewMsg(event.target.value)}
        onKeyDown={(event)=>{
          if(event.key==="Enter"){
            handleSend();
          }
        }} 
        placeholder='Type a message...'  className='border-zinc-600 placehoder-text-xs text-xs lg:text-sm focus-visible:ring-0 placeholder:text-xs '/>
        <Button onClick={handleSend} disabled={!newMsg.trim()} size={'icon'} className='bg-green-800
        cursor-pointer '>
        <Send  className='size-4'/>
        </Button>
    </div>
  )
}

export default ChatInput