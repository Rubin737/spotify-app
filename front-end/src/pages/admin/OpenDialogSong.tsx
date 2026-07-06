import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useAdminStore } from "@/stores/useAdminStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { File, ImageUp, Music4, Plus, X } from "lucide-react";
import { useRef, useState } from "react";

const OpenDialogSong = () => {
  const albums = useMusicStore((store) => store.albums);
  const fetchStats = useAdminStore((store) => store.fetchStats);
  const fetchAlbum=useMusicStore(store=>store.fetchAlbums)
  const fetchSongs=useMusicStore(store=>store.fetchSongs)

  
  const [newSong, setNewSong] = useState({
    artist: "sample Artist",
    album: "",
    title: "sample title",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState({
    audioFile: null,
    imageFile: null,
  });

  const audioRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageFilePicker = () => {
    if (!files?.imageFile) {
      imageRef?.current?.click();
    }
  };

  const handleAudioFilePicker = () => {
    if (!files?.audioFile) {
      audioRef?.current?.click();
    }
  };

  const handleAudioUpload = (event) => {
    setFiles((prev) => {
      return {
        ...prev,
        audioFile: event.target.files?.[0],
      };
    });
  };
  const handleImageUpload = (event) => {
    setFiles((prev) => {
      return {
        ...prev,
        imageFile: event.target.files?.[0],
      };
    });
  };

  const cancelImageFile = (event) => {
    event.stopPropagation();
    setFiles((prev) => ({ ...prev, imageFile: null }));

    if (imageRef?.current?.value) {
      imageRef.current.value = "";
    }
  };

  const cancelAudioFile = (event) => {
    event.stopPropagation();
    setFiles((prev) => ({ ...prev, audioFile: null }));

    if (audioRef?.current?.value) {
      audioRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    try {
      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);

      if (newSong.album && newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }

      formData.append("imageFile", files?.imageFile);
      formData.append("audioFile", files?.audioFile);

      const res = await axiosInstance.post("/admin/create-song", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchAlbum();
      await fetchStats();
      await fetchSongs()

      setIsDialogOpen(false);
      setNewSong({ artist: "", album:"", title: "" });
      setFiles({audioFile:null,imageFile:null});
    } catch (error) {
      // console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => setIsDialogOpen(value)}
    >
      <DialogTrigger asChild>
        <Button className="font-bold cursor-pointer bg-background">
          <Plus className="size-5" />
          Add Song
        </Button>
      </DialogTrigger>

      <DialogContent className=" bg-zinc-800 overflow-auto h-[90vh]  scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add a new song to your music library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 ">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageRef}
            hidden
          />
        </div>
        <div className="space-y-4">
          <input
            type="file"
            accept="audio/*"
            ref={audioRef}
            onChange={handleAudioUpload}
            hidden
          />
        </div>

        <div
          onClick={handleImageFilePicker}
          className="flex items-center justify-center border border-dashed p-16 rounded-lg border-zinc-700"
        >
          {files?.imageFile ? (
            <div className="space-y-2 items-center flex flex-col">
              <div className="space-x-2 items-center flex  cursor-pointer">
                <File className="size-4" />
                <p className="text-sm font-semibold">Image Selected</p>
              </div>
              <div className="flex items-center gap-x-1  hover:underline">
                <p className="text-sm text-gray-500 ">
                  {files?.imageFile?.name?.slice(0, 20)}
                </p>
                <X
                  className="text-red-500 size-4 cursor-pointer"
                  onClick={cancelImageFile}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2 items-center flex flex-col">
              <ImageUp />
              <p className="text-sm font-semibold">Upload Artwork</p>
              <Button
                variant={"outline"}
                size={"sm"}
                className="cursor-pointer"
              >
                Choose File
              </Button>
            </div>
          )}
        </div>

        <div>
          <label>Audio File</label>
          <div
            className="flex items-center justify-center border border-dashed p-4 rounded-lg border-zinc-700"
            onClick={handleAudioFilePicker}
          >
            {files?.audioFile ? (
              <div className="space-x-2 items-center flex  cursor-pointer">
                <Music4 className="size-5" />
                <p>{files?.audioFile.name?.slice(0, 20)}</p>
                <X
                  className="text-red-500 size-4 cursor-pointer"
                  onClick={cancelAudioFile}
                />
              </div>
            ) : (
              <div className="space-x-2 items-center flex  cursor-pointer">
                <Music4 className="size-5" />
                <p>Upload music</p>
              </div>
            )}
          </div>
        </div>

        <FieldGroup>
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input
              type="text"
              placeholder="Fein..."
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
            />
            <FieldDescription>This field must be filled out.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Artist</FieldLabel>
            <Input
              type="text"
              placeholder="Travis Scott"
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
            />
            <FieldDescription>This field must be filled out.</FieldDescription>
          </Field>
        </FieldGroup>

        <Select
          onValueChange={(value) => {
            setNewSong({ ...newSong, album: value });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose Album" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="bg-zinc-800 ">
              <SelectItem value="none">No Album (Single)</SelectItem>
              {albums.map((album) => (
                <SelectItem
                  className="hover:bg-zinc-600 mb-0.5 hover:border-zinc-700 hover:border border-bg-zinc-700"
                  value={album._id}
                  key={album._id}
                >
                  {album.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button
            variant={"outline"}
            disabled={isLoading}
            className="cursor-pointer"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant={"outline"}
            disabled={isLoading}
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            {isLoading ? "Updating..." : "Add Music"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OpenDialogSong;
