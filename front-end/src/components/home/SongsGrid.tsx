import FeaturedSkeleton from '@/skeletons/featuredSkeleton';
import { SongsType } from '@/types/types';
import PlaySongButton from './PlaySongButton';


const SongsGrid = ({songs,error,isLoading,title}:SongsType) => {
  if(isLoading) <FeaturedSkeleton/>
  if(error) <p>Error</p>
  
  return (
    <section>
      <h1 className='text-3xl my-5 font-bold'>{title}</h1>
      <div className='grid grid-cols-5 gap-5'>
        
        {
          songs?.map(song=>(
            <div key={song._id} className='flex flex-col gap-2 group bg-zinc-800 w-fit p-4 rounded-md'>
              <div className='relative'>
                <img src={song.imageUrl} className='w-full rounded-md' alt="song-cover" />
                <div className='absolute bottom-2 right-2'>
                  <PlaySongButton song={song}/>
                </div>
              </div>
              <div className='space-y-1.5'>
                <p className='text-sm font-bold'>{song.title}</p>
                <p className='text-[12px] font-medium text-gray-400'>{song.artist}</p>
              </div>

            </div>
          ))
            
        }
      </div>
    </section>
  )
}

export default SongsGrid