import { useUser } from '@clerk/react';
import { Music4, Users } from 'lucide-react'
import { useEffect } from 'react';
import { LoginPrompt } from './LoginPrompt';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/stores/useChatStore';

const FriendsPage = () => {
  const fetchUsers=useChatStore(store=>store.fetchUsers);
  const users=useChatStore(store=>store.users);
  const onlineUsers=useChatStore(s=>s.onlineUsers);
  const userActivity=useChatStore(s=>s.userActivities)
  const {user} = useUser();
  
  
  useEffect(()=>{
    if(user) fetchUsers();
  },[user,fetchUsers])

  

  return (
    <section className='h-full rounded-md bg-zinc-800 p-3 flex flex-col'>
      <div>
        <div className='flex justify-start items-center text-sm  font-bold border-b pb-1.5'>
        <Users className='size-6 shrink-0'/>
        <span>What they're listening to</span>
      </div>
      </div>

      {
        !user && <LoginPrompt/>
      }

      <ScrollArea className='flex-1 p-3'>
  <div className='flex flex-col gap-y-2'>
    {users?.map((user) =>{ 
    
      const activity=userActivity.get(user.clerkId);
      const isPlaying=activity && activity!=="Idle" 
  
      
    return  (
      <div key={user._id} className='flex gap-3 items-center justify-start'>
        <Avatar className='size-10'>
          <AvatarImage src={user.imageUrl} alt="@shadcn" />
          <AvatarFallback>{user.fullName[0]}</AvatarFallback>
          <AvatarBadge className={`${onlineUsers?.has(user.clerkId)?"bg-green-500":"bg-zinc-600"}`}/>
        </Avatar>
        <div className='flex-1 flex flex-col'>
          <span className='flex gap-2 font-medium text-sm'>
            {user.fullName.split(" ")[0]} {isPlaying &&  <Music4 className='size-4 text-green-500 animate-pulse text-primary'/>}
          </span>
         {
          isPlaying ? (
            <div className='flex flex-col'>
               <span className='text-xs font-bold'>{activity.split("by")[0]}</span>
               <span className='font-bold italic text-[10px] text-zinc-500'>{activity.split("by")[1]}</span>
            </div>
          ): <span className='font-bold text-xs text-zinc-500'>Idle</span>
         }
        </div>
      </div>
    ) }
  )}
  </div>
</ScrollArea>
    </section>
  )
}

export default FriendsPage