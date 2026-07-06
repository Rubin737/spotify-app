import { Button } from '@/components/ui/button'
import { Home, HomeIcon, Library, MessageCircleIcon, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FooterLinks = () => {
  return (
    <footer>
        <Button>
            <Link to={"/"}>
              Home
            </Link>
        </Button>
        
    </footer>
  )
}

export default FooterLinks