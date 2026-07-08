import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music } from 'lucide-react'
import React from 'react'
import SongTable from './SongTable'
import OpenDialogSong from './OpenDialogSong'

const SongContent = () => {
  return (
    <section>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='flex items-center gap-2 text-sm lg:text-lg'>
                <Music className='text-primary lg:size-6 size-4'/>
                Song Library
              </CardTitle>
              <CardDescription className='text-xs'>
                Manage your music tracks
              </CardDescription>
            </div>
            <OpenDialogSong/>
          </div>
        </CardHeader>
         <CardContent>
            <SongTable/>
         </CardContent>
      </Card>
    </section>
  )
}

export default SongContent