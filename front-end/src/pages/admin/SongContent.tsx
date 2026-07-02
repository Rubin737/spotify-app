import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music } from 'lucide-react'
import React from 'react'
import SongTable from './SongTable'
import OpenDialog from './OpenDialog'

const SongContent = () => {
  return (
    <section>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='flex items-center gap-2'>
                <Music className='text-primary size-6'/>
                Song Library
              </CardTitle>
              <CardDescription>
                Manage your music tracks
              </CardDescription>
            </div>
            <OpenDialog/>
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