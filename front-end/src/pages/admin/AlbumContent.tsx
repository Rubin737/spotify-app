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
              <CardTitle className='flex items-center gap-2'>
                <Music className='text-primary size-6'/>
                Album Library
              </CardTitle>
              <CardDescription>
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