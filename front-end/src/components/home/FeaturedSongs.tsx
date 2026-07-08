import FeaturedSkeleton from '@/skeletons/featuredSkeleton';
import PlaySongButton from './PlaySongButton';
import { SongsType } from '@/types/types';
import { useUser } from '@clerk/react';
import SongSectionSkeleton from '@/skeletons/SongLoadingSkeleton';



const FeaturedSongs = ({error,isLoading,songs,title}:SongsType) => {
const {user}=useUser()  

console.log(isLoading);

  if(isLoading) return <SongSectionSkeleton/>
  if(error) return <p>Error</p>

  return (
    <section>
      <h1 className='lg:text-3xl text-lg font-bold my-5'>{title}{user&&<span className='text-gray-400'> , {user.fullName.split(" ")[0]}</span>}</h1>
      <div className='grid lg:grid-cols-3 grid-cols-2 gap-3'>
        {
          songs?.map(song=>(
            <div key={song._id} className='flex border border-zinc-800/50 relative group lg:gap-2 gap-1 items-center bg-zinc-800 rounded-md'>
              <div>
                <img className='lg:size-18 size-12  rounded-l-md overflow-hidden object-cover' src={song.imageUrl} alt="song-cover"/>
              </div>
              <div>
                <p className='font-semibold lg:font-bold text-xs'>{song.title}</p>
                <p className='text-[9px] lg:font-bold font-medium text-zinc-500 '>{song.artist}</p>
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
