import { useAuthStore } from "@/stores/useAuthStore";
import React, { useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminStats from "./AdminStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import { useMusicStore } from "@/stores/useMusicStore";
import { useAdminStore } from "@/stores/useAdminStore";
import SongContent from "./SongContent";
import AlbumContent from "./AlbumContent";

const AdminPage = () => {
  const isLoading = useAuthStore((store) => store.isLoading);
  const isAdmin = useAuthStore((store) => store.isAdmin);
  
  const fetchAlbum=useMusicStore(store=>store.fetchAlbums);
  const fetchSongs=useAdminStore(store=>store.fetchSongs);
  const fetchStats=useAdminStore(store=>store.fetchStats);

  useEffect(()=>{
    fetchAlbum()
    fetchSongs();
    fetchStats();
  },[fetchAlbum,fetchSongs,fetchStats])



  if(!isAdmin && !isLoading) return <>You are not a admin</>

  return (<section className="min-h-screen p-1.5  bg-gradient-b from-zinc-900  via-zinc-900 to-black">
    
    <div className="lg:p-8">
        <AdminHeader/>
        <AdminStats/>
        <Tabs defaultValue="songs" className="w-full flex flex-col my-5">
        <TabsList className="flex gap-1 bg-zinc-800/50 p-1 border-zinc-900">
          <TabsTrigger className="data-[state=active]:bg-zinc-600 px-1 lg:text-md text-sm font-medium cursor-pointer" value="songs"><Music className="size-4 mr-0.5"/>Songs</TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-zinc-600 px-2 lg:text-md text-sm font-medium cursor-pointer" value="albums"><Album className="size-4 mr-0.5"/>Albums</TabsTrigger>
        </TabsList>
        <TabsContent value="songs"><SongContent/></TabsContent>
        <TabsContent value="albums"><AlbumContent/></TabsContent>
      </Tabs>
    </div>

  </section>);
};

export default AdminPage;
