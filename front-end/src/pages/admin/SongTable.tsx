import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminStore } from "@/stores/useAdminStore";
import { Calendar, Trash2Icon } from "lucide-react";
import { useEffect } from "react";



const SongTable = () => {
  const songs = useAdminStore((Store) => Store.songs);
  const delSong=useAdminStore(store=>store.deleteSong)
  const fetchSongs=useAdminStore(s=>s.fetchSongs)
  
  useEffect(()=>{
    fetchSongs()
  },[songs])

  const handleDeleteSong=(id:string)=>{
   delSong(id)
  }
  
 
  return (
    <Table>
      <TableHeader className="hover:bg-zinc-800/50 border-b border-zinc-800">
        <TableRow className="hover:bg-zinc-800/50 ">
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-zinc-900/50">
        {songs?.map((song) => (
          <TableRow key={song._id} className="hover:bg-zinc-800/50">
            <TableCell>
                <img src={song.imageUrl} alt="song-cover" className="size-10 rounded-md object-cover" />
            </TableCell>
            <TableCell className="font-medium" >
                {song.title}
            </TableCell>
            <TableCell >
                {song.artist}
            </TableCell>
            <TableCell>
                <span className="inline-flex items-center gap-1 text-gray-400">
                    <Calendar className="size-4"/>
                    {song.createdAt.split("T")[0]}
                </span>
            </TableCell>
            <TableCell>
                <div className="flex text-right gap-3">
                    <Button variant={"ghost"}
                     size={"sm"}
                     onClick={()=>handleDeleteSong(song._id)}
                     className="text-right cursor-pointer hover:text-red-300 p-2 rounded-lg text-red-400 hover:bg-red-400/10">
                        <Trash2Icon className="size-4"/>
                    </Button> 
                </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SongTable;
