import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/stores/useChatStore'
import { useUser } from '@clerk/react';
import { useEffect, useRef } from 'react';

const ChatBody = () => {
  const messages=useChatStore(s=>s.message);
  const selectedUser=useChatStore(s=>s.selectedUser);
  const{user} = useUser()
  const bottomRef=useRef(null)
  
 useEffect(()=>{
  const lastMessage=messages[messages.length-1];
  const isOwnMessage=lastMessage?.senderID===user?.id
  bottomRef.current?.scrollIntoView({behavior:isOwnMessage?"auto":"smooth"})
},[messages])

  return (
  <ScrollArea className='h-full'>
    <div className="lg:p-5 flex flex-col lg:gap-y-3">
      {messages.length !== 0 ? (
        messages.map((message) => {
          const isOwnMessage = message.senderID === user?.id;
          return (
            <div
              key={message._id}
              className={`flex items-end gap-x-2 ${
                isOwnMessage ? "flex-row-reverse self-end" : "self-start"
              } min-w-0 max-w-[120px] lg:max-w-[200px]`}
            >
              <Avatar className="size-6 shrink-0">
                <AvatarImage
                  src={isOwnMessage ? user?.imageUrl : selectedUser?.imageUrl}
                />
                <AvatarFallback>
                  {isOwnMessage ? user?.fullName?.[0] : selectedUser?.fullName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
              <div
                className={`px-3 py-2  min-w-0 wrap-break-word whitespace-pre-wrap rounded-2xl text-xs  ${
                  isOwnMessage
                    ? "bg-green-500 text-white rounded-br-sm"
                    : "bg-zinc-700 text-zinc-100 rounded-bl-sm"
                }`}
              >
                <p className='wrap-break-word'>{message.content}</p>
              </div>
              {message.createdAt && (
                  <span
                    className={`block mt-1 text-[10px] ${
                      isOwnMessage ? "text-green-100 text-end" : "text-zinc-400"
                    }`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12:true
                    })}
                  </span>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex text-xs text-black lg:w-[50%] w-[70%] p-2 bg-green-500 flex-col border rounded-md">
          <p>👋 Welcome!</p>
          <p>
            This is the beginning of your conversation with{" "}
            {selectedUser?.fullName || "this person"}. Send a message to get
            things started.
          </p>
        </div>
      )}
      <div ref={bottomRef}></div>
    </div>
  </ScrollArea>
);
}

export default ChatBody