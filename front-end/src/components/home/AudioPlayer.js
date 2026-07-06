import { jsx as _jsx } from "react/jsx-runtime";
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useEffect, useRef } from 'react';
const AudioPlayer = () => {
    const audioRef = useRef(null);
    const prevSongRef = useRef(null);
    const currentSong = usePlayerStore(store => store.currentSong);
    const isPlaying = usePlayerStore(store => store.isPlaying);
    const playNext = usePlayerStore(store => store.playNext);
    useEffect(() => {
        if (isPlaying)
            audioRef.current?.play();
        else
            audioRef.current?.pause();
    }, [isPlaying]);
    useEffect(() => {
        const audio = audioRef.current;
        audio?.addEventListener("ended", playNext);
        return () => audio?.removeEventListener("ended", playNext);
    }, [playNext]);
    useEffect(() => {
        if (!audioRef.current || !currentSong)
            return;
        const audio = audioRef.current;
        const isSongChanged = prevSongRef.current !== currentSong?.audioUrl;
        if (isSongChanged) {
            audio.src = currentSong?.audioUrl;
            audio.currentTime = 0;
            prevSongRef.current = currentSong?.audioUrl;
            if (isPlaying) {
                audio.play();
            }
        }
    }, [currentSong]);
    return _jsx("audio", { ref: audioRef });
};
export default AudioPlayer;
