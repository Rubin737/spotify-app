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


  return (
    <div className="space-y-3">
      <div className="pt-2"><TopBar /></div>
      <FeaturedSongs title="Good Morning" songs={featuredSongs} isLoading={isLoading} error={error}/>
      <SongsGrid title="Made For You" songs={madeForUSongs} isLoading={isLoading} error={error}/>
      <SongsGrid title="Trending Songs" songs={trendingSongs} isLoading={isLoading} error={error}/>
    </div>
  );
};

export default HomePage;
