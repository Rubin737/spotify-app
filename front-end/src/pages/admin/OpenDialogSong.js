import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useAdminStore } from "@/stores/useAdminStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { File, ImageUp, Music4, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
const OpenDialogSong = () => {
    const albums = useMusicStore((store) => store.albums);
    const fetchStats = useAdminStore((store) => store.fetchStats);
    const fetchAlbum = useMusicStore(store => store.fetchAlbums);
    const fetchSongs = useMusicStore(store => store.fetchSongs);
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
            await fetchSongs();
            setIsDialogOpen(false);
            setNewSong({ artist: "", album: "", title: "" });
            setFiles({ audioFile: null, imageFile: null });
        }
        catch (error) {
            // console.log(error.response.data.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs(Dialog, { open: isDialogOpen, onOpenChange: (value) => setIsDialogOpen(value), children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "font-bold cursor-pointer bg-background", children: [_jsx(Plus, { className: "size-5" }), "Add Song"] }) }), _jsxs(DialogContent, { className: " bg-zinc-800 overflow-auto h-[90vh]  scrollbar-hide", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Add New Song" }), _jsx(DialogDescription, { children: "Add a new song to your music library" })] }), _jsx("div", { className: "space-y-4 ", children: _jsx("input", { type: "file", accept: "image/*", onChange: handleImageUpload, ref: imageRef, hidden: true }) }), _jsx("div", { className: "space-y-4", children: _jsx("input", { type: "file", accept: "audio/*", ref: audioRef, onChange: handleAudioUpload, hidden: true }) }), _jsx("div", { onClick: handleImageFilePicker, className: "flex items-center justify-center border border-dashed p-16 rounded-lg border-zinc-700", children: files?.imageFile ? (_jsxs("div", { className: "space-y-2 items-center flex flex-col", children: [_jsxs("div", { className: "space-x-2 items-center flex  cursor-pointer", children: [_jsx(File, { className: "size-4" }), _jsx("p", { className: "text-sm font-semibold", children: "Image Selected" })] }), _jsxs("div", { className: "flex items-center gap-x-1  hover:underline", children: [_jsx("p", { className: "text-sm text-gray-500 ", children: files?.imageFile?.name?.slice(0, 20) }), _jsx(X, { className: "text-red-500 size-4 cursor-pointer", onClick: cancelImageFile })] })] })) : (_jsxs("div", { className: "space-y-2 items-center flex flex-col", children: [_jsx(ImageUp, {}), _jsx("p", { className: "text-sm font-semibold", children: "Upload Artwork" }), _jsx(Button, { variant: "outline", size: "sm", className: "cursor-pointer", children: "Choose File" })] })) }), _jsxs("div", { children: [_jsx("label", { children: "Audio File" }), _jsx("div", { className: "flex items-center justify-center border border-dashed p-4 rounded-lg border-zinc-700", onClick: handleAudioFilePicker, children: files?.audioFile ? (_jsxs("div", { className: "space-x-2 items-center flex  cursor-pointer", children: [_jsx(Music4, { className: "size-5" }), _jsx("p", { children: files?.audioFile.name?.slice(0, 20) }), _jsx(X, { className: "text-red-500 size-4 cursor-pointer", onClick: cancelAudioFile })] })) : (_jsxs("div", { className: "space-x-2 items-center flex  cursor-pointer", children: [_jsx(Music4, { className: "size-5" }), _jsx("p", { children: "Upload music" })] })) })] }), _jsxs(FieldGroup, { children: [_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Title" }), _jsx(Input, { type: "text", placeholder: "Fein...", value: newSong.title, onChange: (e) => setNewSong({ ...newSong, title: e.target.value }) }), _jsx(FieldDescription, { children: "This field must be filled out." })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { children: "Artist" }), _jsx(Input, { type: "text", placeholder: "Travis Scott", value: newSong.artist, onChange: (e) => setNewSong({ ...newSong, artist: e.target.value }) }), _jsx(FieldDescription, { children: "This field must be filled out." })] })] }), _jsxs(Select, { onValueChange: (value) => {
                            setNewSong({ ...newSong, album: value });
                        }, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Choose Album" }) }), _jsx(SelectContent, { children: _jsxs(SelectGroup, { className: "bg-zinc-800 ", children: [_jsx(SelectItem, { value: "none", children: "No Album (Single)" }), albums.map((album) => (_jsx(SelectItem, { className: "hover:bg-zinc-600 mb-0.5 hover:border-zinc-700 hover:border border-bg-zinc-700", value: album._id, children: album.title }, album._id)))] }) })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", disabled: isLoading, className: "cursor-pointer", onClick: () => setIsDialogOpen(false), children: "Cancel" }), _jsx(Button, { variant: "outline", disabled: isLoading, className: "cursor-pointer", onClick: handleSubmit, children: isLoading ? "Updating..." : "Add Music" })] })] })] }));
};
export default OpenDialogSong;
