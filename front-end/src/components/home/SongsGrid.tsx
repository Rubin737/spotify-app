import { SongsType } from '@/types/types';
import PlaySongButton from './PlaySongButton';
import SongLoadingSkeleton from '@/skeletons/SongLoadingSkeleton';
import ErrorMessage from '@/pages/404/ErrorMesage';


const SongsGrid = ({songs,error,isLoading,title}:SongsType) => {
  if(isLoading) return <SongLoadingSkeleton/>
  if(error) return <ErrorMessage/>
  
  return (
    <section>
      <h1 className='lg:text-3xl text-lg my-5 font-bold'>{title}</h1>
      <div className='grid lg:grid-cols-5 grid-cols-3 gap-2 lg:gap-5'>
        
        {
          songs?.map(song=>(
            <div key={song._id} className='flex flex-col gap-2 group bg-zinc-800 lg:p-4 p-1 rounded-md'>
              <div className='relative'>
                <img src={song.imageUrl} className='rounded-md size-[110px] md:size-[150px] lg:size-[227px] object-cover' alt="song-cover" />
                <div className='absolute bottom-2 right-2'>
                  <PlaySongButton song={song}/>
                </div>
              </div>
              <div className='lg:space-y-1.5 space-y-0.5'>
                <p className='lg:text-sm text-xs font-bold'>{song.title}</p>
                <p className='text-[10px] font-medium text-gray-400'>{song.artist}</p>
              </div>

            </div>
          ))
            
        }
      </div>
    </section>
  )
}

export default SongsGrid