import FeaturedSkeleton from '@/skeletons/featuredSkeleton';
import PlaySongButton from './PlaySongButton';
import { SongsType } from '@/types/types';



const FeaturedSongs = ({error,isLoading,songs,title}:SongsType) => {
  

  if(isLoading) <FeaturedSkeleton/>
  if(error) <p>Error</p>

  return (
    <section>
      <h1 className='text-3xl font-bold my-5'>{title}</h1>
      <div className='grid grid-cols-3 gap-3'>
        {
          songs?.map(song=>(
            <div key={song._id} className='flex relative group gap-2 items-center bg-zinc-800 rounded-md'>
              <div>
                <img className='size-18 rounded-l-md overflow-hidden object-cover' src={song.imageUrl} alt="song-cover"/>
              </div>
              <div>
                <p className='font-bold text-sm'>{song.title}</p>
                <p className='text-[11px] font-bold text-secondary'>{song.artist}</p>
              </div>
              <div className='absolute right-3 bottom-3'>
              <PlaySongButton song={song}/>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default FeaturedSongs
