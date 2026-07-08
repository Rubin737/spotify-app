import { usePlayerStore } from "@/stores/usePlayerStore";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  ShuffleIcon,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Slider } from "./ui/slider";
import { formatDuration } from "@/utils/formatDuration";
import { Button } from "./ui/button";

const PlayerControls = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(10);

  const isPlaying = usePlayerStore((store) => store.isPlaying);
  const currentSong = usePlayerStore((store) => store.currentSong);
  const playPrevious = usePlayerStore((store) => store.playPrevious);
  const playNext = usePlayerStore((store) => store.playNext);
  const togglePlay = usePlayerStore((store) => store.togglePlay);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;

    if (!audio) return;

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

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
    };

      const handleVolume= (value: number[]) => {
        setVolume(value[0]);
        if (audioRef.current) {
          audioRef.current.volume = value[0] / 100;
        }
  };

  return (
    <section className="h-16 sm:h-24 bg-zinc-900 w-full mb-3 border-t border-zinc-800 lg:px-4 px-2">
      <div className="flex justify-between items-center h-full max-w-[1800px] gap-x-10 lg:gap-x-1 lg:mx-auto">
        {/* Left - Song Info */}
        <div className="flex items-center lg:gap-4 gap-2  lg:min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                className="lg:size-10 size-10 object-cover rounded-md"
                src={currentSong.imageUrl}
                alt="song-cover"
              />
              <div>
                <p className="lg:text-sm text-xs font-bold truncate">
                  {currentSong.title}
                </p>
                <p className="text-[10px] text-gray-400 truncate">
                  {currentSong.artist}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Center - Controls + Seek */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center lg:gap-4 gap-2">
            <Button variant="outline" size="icon" className="p-3 hidden">
              <ShuffleIcon />
            </Button>
            <Button 
              className="rounded-lg border-2 text-black border-green-950 bg-green-500"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="size-3  lg:size-4" />
            </Button>
            <Button
            className="rounded-lg border-2 border-green-950 bg-green-500"
            onClick={togglePlay}>
            
              {isPlaying ? <Pause className="size-3  text-black lg:size-4" /> : <Play className="size-3 lg:size-4" />}
            </Button>
            <Button
              className="rounded-lg border-2 border-green-950 bg-green-500"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward  className="size-3 text-black  lg:size-4"/>
            </Button>
            <Button className="hidden lg:block">
              <Repeat />
            </Button>
          </div>

          {/* Seek bar — wrapper needs w-full */}
          <div className="flex items-center lg:gap-2 gap-x-3  w-full">
            <span className="text-xs text-zinc-400">
              {formatDuration(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="w-full hover:cursor-grabbing"
            />
            <span className="text-xs text-zinc-400">
              {formatDuration(duration)}
            </span>
          </div>
        </div>

        {/* Right - Extra controls + Volume */}
        <div className="min-w-[180px] hidden lg:flex w-[30%]  items-center justify-end gap-2">
          <button className="btn btn-circle p-3">
            <Mic2 />
          </button>
          <button className="p-3">
            <ListMusic />
          </button>
          <button className="p-3">
            <Laptop2 />
          </button>
          <div className="flex items-center gap-2">
            <Volume1 />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24 cursor-grabbing"
              onValueChange={handleVolume}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerControls;
