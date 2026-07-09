import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Album, BadgeAlert, HomeIcon, MessageSquareQuote, TelescopeIcon } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'


const navBar=[
  {
    name:"Home",
    icon:<HomeIcon className='size-5'/>,
    to:"/"
  },
  {
    name:"Albums",
    icon:<Album className='size-5'/>,
    to:"/album"
  },
  {
    name:"Message",
    icon:<MessageSquareQuote className='size-5'/>,
    to:"/chat"
  },
  {
    name:"Activity",
    icon:<TelescopeIcon className='size-5'/>,
    to:"/activity"
  },
  {
    name:"Admin",
    icon:<BadgeAlert className='size-5'/>,
    to:"/admin",
    adminOnly:true
  },

]
  


const MobileFooter = () => {
   const isAdmin = useAuthStore((store) => store.isAdmin);
  
  return (
    
    <footer className='flex  px-2 py-2 justify-between items-center'>
      {
        navBar.filter(item=>!item.adminOnly || isAdmin).map((item,i)=>(
          <Button size='icon' asChild className='cursor-pointer' key={i}>
            <Link to={item.to} className='flex flex-col items-center gap-1 '>
              {
                item.icon
              }
              <p className='text-[10px] text-gray-600 font-bold'>{item.name}</p> 
            </Link>
          </Button>
        ))
      }
    </footer>
  )
}

export default MobileFooter