import { Songs } from "@/types/types";
import { create } from "zustand";

interface PlayerStore {
  currentSong: Songs | null;
  isPlaying: boolean;
  queue: Songs[];
  currentIndex: number;

  initializeQueue: (songs: Songs[]) => void;
  playAlbum: (songs: Songs[], startIndex: number) => void;
  setCurrentSong: (song: Songs) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  currentIndex: -1,
  queue: [],

  initializeQueue: (songs: Songs[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },
  playAlbum: (songs: Songs[], startIndex = 0) => {
    set({
      queue: songs,
      currentSong: songs[startIndex],
      currentIndex: startIndex,
      isPlaying: true,
    });
  },
  setCurrentSong: (song: Songs) => {
    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },
  playNext: () => {
    const { queue, currentIndex } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      set({
        currentSong: queue[nextIndex],
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false, currentIndex: -1, currentSong: null });
    }
  },

  playPrevious: () => {
    const { queue, currentIndex } = get();
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      set({
        currentSong: queue[prevIndex],
        currentIndex: prevIndex,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },

  togglePlay: () => {
    set({ isPlaying: !get().isPlaying });
  },
}));
