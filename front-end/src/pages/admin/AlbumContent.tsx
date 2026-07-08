import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Music } from 'lucide-react'
import OpenDialogAlbum from './OpenDialogAlbum'
import AlbumTable from './AlbumTable'

const AlbumContent = () => {
  return (
     <section>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='flex items-center text-sm  gap-2'>
                <Music className='lg:size-6 size-4'/>
                Album Library
              </CardTitle>
              <CardDescription className='text-xs lg:text-sm'>
                Manage your album history
              </CardDescription>
            </div>
            <OpenDialogAlbum/>
          </div>
        </CardHeader>
         <CardContent>
            <AlbumTable/>
         </CardContent>
      </Card>
    </section>
  )
}
 
export default AlbumContent