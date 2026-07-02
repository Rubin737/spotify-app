import { usePlayerStore } from '@/stores/usePlayerStore'
import { Songs } from '@/types/types'
import { Pause, Play } from 'lucide-react'

const PlaySongButton = ({song}:{song:Songs}) => {
  const currentSong=usePlayerStore(store=>store.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const setCurrentSong=usePlayerStore(store=>store.setCurrentSong)

  const isCurrentSong=currentSong?._id===song._id

  const handlePlaySong=()=>{
    if(isCurrentSong) togglePlay();
    else setCurrentSong(song);

  }
  return (
    <button onClick={handlePlaySong} 
    className={`btn btn-xs bg-primary rounded-md hover:scale-105 transition-all translate-y-1 group-hover:translate-y-0 hover:bg-primary/80 border-0
    ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
    `}>
      {
        isCurrentSong && isPlaying ? (<Pause  fill='black' className='size-3.5'/>) : <Play fill='black' className='size-3.5'/>
      }

    </button>
  )
}

export default PlaySongButton