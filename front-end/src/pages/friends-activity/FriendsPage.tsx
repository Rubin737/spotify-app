import { useUserStore } from '@/stores/useUserStore'
import { useUser } from '@clerk/react';
import { Music, Users } from 'lucide-react'
import { useEffect } from 'react';
import { LoginPrompt } from './LoginPrompt';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

const FriendsPage = () => {
  const {error,fetchUsers,isLoading,users}=useUserStore();
  const {user} = useUser();
  
  const isPlaying=true
  
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
    {users?.map((user) => (
      <div key={user._id} className='flex gap-3 items-center justify-start'>
        <Avatar className='size-10'>
          <AvatarImage src={user.imageUrl} alt="@shadcn" />
          <AvatarFallback>{user.fullName[0]}</AvatarFallback>
          <AvatarBadge className="bg-green-600 !size-1.5 dark:bg-green-800"/>
        </Avatar>
        <div className='flex-1 flex flex-col'>
          <span className='flex gap-2 font-medium text-sm'>
            {user.fullName.split(" ")[0]} {isPlaying &&  <Music className='size-5 text-primary'/>}
          </span>
         {
          isPlaying ? (
            <div className='flex flex-col'>
               <span className='text-sm font-bold'>Night crawler</span>
               <span className='font-bold text-[12px] text-zinc-500'>Michel Jackson</span>
            </div>
          ): <span className='font-bold text-[12px] text-zinc-500'>Idle</span>
         }
        </div>
      </div>
    ))}
  </div>
</ScrollArea>
    </section>
  )
}

export default FriendsPage