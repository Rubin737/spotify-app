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
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash2Icon } from "lucide-react";

const AlbumTable = () => {
  const albums=useMusicStore(store=>store.albums)
  const delAlbum=useAdminStore(store=>store.deleteAlbum)
  const handleDeleteAlbum=(id:string)=>{
   delAlbum(id)
  }

  
  

  return (
    <Table>
      <TableHeader className="hover:bg-zinc-800/50 border-b border-zinc-800">
        <TableRow className="hover:bg-zinc-800/50 ">
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Year</TableHead>
          <TableHead>Songs</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-zinc-900/50">
        {albums?.map((album) => (
          <TableRow key={album._id} className="hover:bg-zinc-800/50">
            <TableCell>
                <img src={album.imageUrl} alt="song-cover" className="size-10 rounded-md object-cover" />
            </TableCell>
            <TableCell className="font-medium" >
                {album.title}
            </TableCell>
            <TableCell >
                {album.artist}
            </TableCell>
            <TableCell>
                <span className="inline-flex items-center gap-1 text-gray-400">
                    <Calendar className="size-4"/>
                    {album.releaseYear}
                </span>
            </TableCell>
            <TableCell>
                <span className="inline-flex items-center gap-1 text-gray-400">
                    <Music className="size-4"/>
                    {album.songs.length} Songs
                </span>
            </TableCell>
            <TableCell>
                <div className="flex text-right gap-3">
                    <Button variant={"ghost"}
                     size={"sm"}
                     onClick={()=>handleDeleteAlbum(album._id)}
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

export default AlbumTable;
