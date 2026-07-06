import { Avatar, AvatarBadge, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import UsersListSkeleton from '@/skeletons/UsersListSkeleton';
import { useChatStore } from '@/stores/useChatStore'

const UsersList = () => {

  const isLoading=useChatStore(store=>store.isUserLoading);
  const onlineUsers=useChatStore(store=>store.onlineUsers);
  const selectedUser=useChatStore(store=>store.selectedUser);
  const setSelectedUser=useChatStore(store=>store.setSelectedUser);
  const users=useChatStore(s=>s.users)
  


  return (
    <div className='border-r px-2 border-r-zinc-700 '>
      <ScrollArea className='h-[calc(100vh-280px)]'>
        <div>
          {
            isLoading===false ? (
              users.map(user=>(
                <div 
                onClick={()=>{
                  setSelectedUser(user);
                }}
                className={`flex mt-2 gap-3 cursor-pointer p-2 hover:bg-zinc-900/50 items-center ${selectedUser?.clerkId===user.clerkId ? "bg-zinc-900/50" : "bg-zinc-950/50"}`}  key={user._id}>
                
                <Avatar className={`size-10 p-1 ${onlineUsers?.has(user.clerkId) ? "bg-green-600 dark:bg-green-800" : "bg-zinc-300" } `}>
                  <AvatarImage src={user.imageUrl}></AvatarImage>
                  <AvatarBadge className={` ${onlineUsers?.has(user.clerkId) ? "bg-green-600 dark:bg-green-800" : "bg-zinc-300" }`} />
                </Avatar>
                <div>
                  <h1 className='text-sm text-gray-300 font-bold'>{user.fullName}</h1>
                  <p className='text-[10px] italic'>{onlineUsers?.has(user.clerkId) ? "online" : "offline"}</p>
                </div>
                </div>
              ))
          ) : (<UsersListSkeleton/>)
          }
        </div>
        
      </ScrollArea>
    </div>
  )
}

export default UsersList