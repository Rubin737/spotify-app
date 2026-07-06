import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, ShuffleIcon, SkipBack, SkipForward, Volume1, } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Slider } from "./ui/slider";
import { formatDuration } from "@/utils/formatDuration";
const PlayerControls = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(10);
    const isPlaying = usePlayerStore((store) => store.isPlaying);
    const currentSong = usePlayerStore((store) => store.currentSong);
    const playPrevious = usePlayerStore((store) => store.playPrevious);
    const playNext = usePlayerStore((store) => store.playNext);
    const togglePlay = usePlayerStore((store) => store.togglePlay);
    const audioRef = useRef(null);
    useEffect(() => {
        audioRef.current = document.querySelector("audio");
        const audio = audioRef.current;
        if (!audio)
            return;
        const updateTime = () => setCurrentTime(audio?.currentTime);
        const updateDuration = () => setDuration(audio?.duration);
        audio?.addEventListener("timeupdate", updateTime);
        audio?.addEventListener("loadedmetadata", updateDuration);
        const handleEnded = () => {
            usePlayerStore.setState({ isPlaying: false });
        };
        audio.addEventListener("ended", handleEnded);
        return () => {
            audio?.removeEventListener("timeupdate", updateTime);
            audio?.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [currentSong]);
    const handleSeek = (value) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
        }
    };
    const handleVolume = (value) => {
        setVolume(value[0]);
        if (audioRef.current) {
            audioRef.current.volume = value[0] / 100;
        }
    };
    return (_jsx("footer", { className: "h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4", children: _jsxs("div", { className: "flex justify-between items-center h-full max-w-[1800px] mx-auto", children: [_jsx("div", { className: "flex items-center gap-4 min-w-[180px] w-[30%]", children: currentSong && (_jsxs(_Fragment, { children: [_jsx("img", { className: "size-10 object-cover rounded-md", src: currentSong.imageUrl, alt: "song-cover" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium truncate", children: currentSong.title }), _jsx("p", { className: "text-[12px] font-bold truncate", children: currentSong.artist })] })] })) }), _jsxs("div", { className: "flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]", children: [_jsxs("div", { className: "flex items-center gap-4 sm:gap-6", children: [_jsx("button", { className: "btn btn-circle p-3", children: _jsx(ShuffleIcon, {}) }), _jsx("button", { className: "btn btn-circle p-3", onClick: playPrevious, disabled: !currentSong, children: _jsx(SkipBack, {}) }), _jsx("button", { className: "btn btn-circle bg-primary", onClick: togglePlay, children: isPlaying ? _jsx(Pause, {}) : _jsx(Play, {}) }), _jsx("button", { className: "btn btn-circle p-3", onClick: playNext, disabled: !currentSong, children: _jsx(SkipForward, {}) }), _jsx("button", { className: "btn btn-circle p-3", children: _jsx(Repeat, {}) })] }), _jsxs("div", { className: "flex items-center gap-2 w-full", children: [_jsx("span", { className: "text-xs text-zinc-400", children: formatDuration(currentTime) }), _jsx(Slider, { value: [currentTime], max: duration || 100, step: 1, onValueChange: handleSeek, className: "w-full hover:cursor-grabbing" }), _jsx("span", { className: "text-xs text-zinc-400", children: formatDuration(duration) })] })] }), _jsxs("div", { className: "min-w-[180px] w-[30%] flex items-center justify-end gap-2", children: [_jsx("button", { className: "btn btn-circle p-3", children: _jsx(Mic2, {}) }), _jsx("button", { className: "btn btn-circle p-3", children: _jsx(ListMusic, {}) }), _jsx("button", { className: "btn btn-circle p-3", children: _jsx(Laptop2, {}) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Volume1, {}), _jsx(Slider, { value: [volume], max: 100, step: 1, className: "w-24 cursor-grabbing", onValueChange: handleVolume })] })] })] }) }));
};
export default PlayerControls;
