import { useEffect } from "react";
import FeaturedSongs from "./FeaturedSongs";
import SongsGrid from "./SongsGrid";
import TopBar from "./TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {

   
  const fetchMadeForUSongs=useMusicStore(state=>state.fetchMadeForUSongs);
  const fetchTrendingSongs=useMusicStore(state=>state.fetchTrendingSongs);
  const fetchFeaturedSongs=useMusicStore(state=>state.fetchFeaturedSongs);
  const madeForUSongs=useMusicStore(state=>state.madeForUSongs);
  const trendingSongs=useMusicStore(state=>state.trendingSongs);
  const featuredSongs=useMusicStore(state=>state.featuredSongs);
  const isLoading=useMusicStore(state=>state.isLoading)
  const error=useMusicStore(state=>state.error)

  const isTLoading=useMusicStore(state=>state.isTrendingLoading)
  const tError=useMusicStore(state=>state.trendingSongError)
  const isMLoading=useMusicStore(state=>state.isMadeSongLoading)
  const MaError=useMusicStore(state=>state.madeSongError)
  const isFLoading=useMusicStore(state=>state.isFeatureSongLoading)
  const feError=useMusicStore(state=>state.featureSongError)
  
  
  const initQ=usePlayerStore(store=>store.initializeQueue)
  
  useEffect(()=>{
    fetchTrendingSongs();
    fetchMadeForUSongs();
    fetchFeaturedSongs();
  },[]) 

  useEffect(()=>{
    
  if(trendingSongs.length>0 && featuredSongs.length>0 && madeForUSongs.length>0){
          const queue=[...trendingSongs,...featuredSongs,...madeForUSongs];
          initQ(queue)
    }

  },[trendingSongs,madeForUSongs,featuredSongs])
  
  const findTime=()=>{
    const date=new Date();
    let greeting:string=""
    const time=date.getHours()
    if(time>=1 && time <=12){
      greeting="Good Morning";
    }
    else{
      greeting="Good Evening"
    }

          
    
    return greeting
  }

  
   
  return (
    <div className="space-y-3">
      <div className="pt-2"><TopBar /></div>
      <FeaturedSongs title={findTime()} songs={featuredSongs} isLoading={isFLoading} error={feError}/>
      <SongsGrid title="Made For You" songs={madeForUSongs} isLoading={isMLoading} error={MaError}/>
      <SongsGrid title="Trending Songs" songs={trendingSongs} isLoading={isTLoading} error={tError}/>
    </div>
  );
};

export default HomePage;
