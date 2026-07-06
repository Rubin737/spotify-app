import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { useAdminStore } from "@/stores/useAdminStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { File, ImageUp, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
const OpenDialogAlbum = () => {
    const fetchAlbum = useMusicStore((store) => store.fetchAlbums);
    const fetchStats = useAdminStore((store) => store.fetchStats);
    const [newAlbum, setNewAlbum] = useState({
        artist: "sample Artist",
        releaseYear: "2000",
        title: "sample title",
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
        }
        catch (error) {
            // console.log(error.response.data.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs(Dialog, { open: isDialogOpen, onOpenChange: (value) => setIsDialogOpen(value), children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "font-bold cursor-pointer bg-background", children: [_jsx(Plus, { className: "size-5" }), "Add Album"] }) }), _jsxs(DialogContent, { className: " bg-zinc-800 overflow-auto h-[90vh]  scrollbar-hide", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Add New Song" }), _jsx(DialogDescription, { children: "Add a new song to your music library" })] }), _jsx("div", { className: "space-y-4 ", children: _jsx("input", { type: "file", accept: "image/*", onChange: handleImageUpload, ref: imageRef, hidden: true }) }), _jsx("div", { onClick: handleImageFilePicker, className: "flex items-center justify-center border border-dashed p-16 rounded-lg border-zinc-700", children: files?.imageFile ? (_jsxs("div", { className: "space-y-2 items-center flex flex-col", children: [_jsxs("div", { className: "space-x-2 items-center flex  cursor-pointer", children: [_jsx(File, { className: "size-4" }), _jsx("p", { className: "text-sm font-semibold", children: "Image Selected" })] }), _jsxs("div", { className: "flex items-center gap-x-1  hover:underline", children: [_jsx("p", { className: "text-sm text-gray-500 ", children: files?.imageFile?.name?.slice(0, 20) }), _jsx(X, { className: "text-red-500 size-4 cursor-pointer", onClick: cancelImageFile })] })] })) : (_jsxs("div", { className: "space-y-2 items-center flex flex-col", children: [_jsx(ImageUp, {}), _jsx("p", { className: "text-sm font-semibold", children: "Upload Album Work" }), _jsx(Button, { variant: "outline", size: "sm", className: "cursor-pointer", children: "Choose File" })] })) }), _jsxs(FieldGroup, { children: [_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Album Title" }), _jsx(Input, { type: "Vibes Year", placeholder: "Travis Scott", value: newAlbum.title, onChange: (e) => setNewAlbum({ ...newAlbum, title: e.target.value }) }), _jsx(FieldDescription, { children: "This field must be filled out." })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { children: "Artist" }), _jsx(Input, { type: "text", placeholder: "Travis Scott", value: newAlbum.artist, onChange: (e) => setNewAlbum({ ...newAlbum, artist: e.target.value }) }), _jsx(FieldDescription, { children: "This field must be filled out." })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { children: "Release Year" }), _jsx(Input, { type: "number", placeholder: "2014", value: newAlbum.releaseYear, onChange: (e) => setNewAlbum({ ...newAlbum, releaseYear: e.target.value }) }), _jsx(FieldDescription, { children: "This field must be filled out." })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", disabled: isLoading, className: "cursor-pointer", onClick: () => setIsDialogOpen(false), children: "Cancel" }), _jsx(Button, { variant: "outline", disabled: isLoading, className: "cursor-pointer", onClick: handleSubmit, children: isLoading ? "Creating..." : "Add Album" })] })] })] }));
};
export default OpenDialogAlbum;
