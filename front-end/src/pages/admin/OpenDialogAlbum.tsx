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
import { axiosInstance } from "@/lib/axios";
import { useAdminStore } from "@/stores/useAdminStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { File, ImageUp, Plus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const OpenDialogAlbum = () => {
  const fetchAlbum = useMusicStore((store) => store.fetchAlbums);
  const fetchStats = useAdminStore((store) => store.fetchStats);

  const [newAlbum, setNewAlbum] = useState({
    artist: "",
    releaseYear: "",
    title: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState({
    imageFile: null,
  });

  const imageRef = useRef(null);

  const handleImageFilePicker = () => {
    if (!files?.imageFile) {
      imageRef?.current?.click();
    }
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

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    try {
      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear);
      formData.append("imageFile", files?.imageFile);

      const res = await axiosInstance.post("/admin/create-album", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      await fetchAlbum(); 
      await fetchStats(); 

      setIsDialogOpen(false); 
      setNewAlbum({ artist: "", releaseYear: "", title: "" }); 
      setFiles({ imageFile: null });
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
        <Button  className="font-bold text-xs lg:text-sm cursor-pointer bg-background">
          <Plus className="lg:size-5 size-4" />
          Add Album
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

        <div
          onClick={handleImageFilePicker}
          className="flex items-center justify-center border border-dashed lg:p-16 p-8   rounded-lg border-zinc-700"
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
              <p className="text-sm font-semibold">Upload Album Work</p>
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

        <FieldGroup>
          <Field>
            <FieldLabel>Album Title</FieldLabel>
            <Input
              type="text"
              placeholder="Travis Scott"
              className="placeholder:text-xs"
              value={newAlbum.title}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, title: e.target.value })
              }
            />
            <FieldDescription className="text-xs lg:text-sm">This field must be filled out.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Artist</FieldLabel>
            <Input
              type="text"
              placeholder="Travis Scott"
                className="placeholder:text-xs"
              value={newAlbum.artist}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, artist: e.target.value })
              }
            />
            <FieldDescription className="text-xs lg:text-sm">This field must be filled out.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Release Year</FieldLabel>
            <Input
              type="number"
              placeholder="2014"
              className="placeholder:text-xs"
              value={newAlbum.releaseYear}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, releaseYear: e.target.value })
              }
            />
            <FieldDescription className="text-xs lg:text-sm">This field must be filled out.</FieldDescription>
          </Field>
        </FieldGroup>

        <DialogFooter>
          <Button
            variant={"destructive"}
            disabled={isLoading}
            className="cursor-pointer bg-red-500"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
          
            variant={"destructive"}
            disabled={isLoading}
            className="cursor-pointer bg-green-600"
            onClick={handleSubmit}
          >
            {isLoading ? "Creating..." : "Add Album"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OpenDialogAlbum;
