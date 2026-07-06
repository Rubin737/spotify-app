import { create } from "zustand";
export const usePlayerStore = create((set, get) => ({
    currentSong: null,
    isPlaying: false,
    currentIndex: -1,
    queue: [],
    initializeQueue: (songs) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
        });
    },
    playAlbum: (songs, startIndex = 0) => {
        const socket = useChatStore.getState().socket;
        if (socket.auth) {
            socket.emit("updated_activity", {
                userId: socket.auth.userId,
                activity: `playing ${songs[startIndex].title} by ${songs[startIndex].artist} `,
            });
        }
        set({
            queue: songs,
            currentSong: songs[startIndex],
            currentIndex: startIndex,
            isPlaying: true,
        });
    },
    setCurrentSong: (song) => {
        const socket = useChatStore.getState().socket;
        if (socket.auth) {
            socket.emit("updated_activity", {
                userId: socket.auth.userId,
                activity: ` ${song.title} by ${song.artist} `,
            });
        }
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
        const nextSong = queue[nextIndex];
        const socket = useChatStore.getState().socket;
        if (socket.auth) {
            socket.emit("updated_activity", {
                userId: socket.auth.userId,
                activity: `${nextSong.title} by ${nextSong.artist}`,
            });
        }
        if (nextIndex < queue.length) {
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true,
            });
        }
        else {
            const socket = useChatStore.getState().socket;
            if (socket.auth) {
                socket.emit("updated_activity", {
                    userId: socket.auth.userId,
                    activity: `Idle`,
                });
            }
            set({ isPlaying: false, currentIndex: -1, currentSong: null });
        }
    },
    playPrevious: () => {
        const { queue, currentIndex } = get();
        const prevIndex = currentIndex - 1;
        const prevSong = queue[prevIndex];
        const socket = useChatStore.getState().socket;
        if (socket.auth) {
            socket.emit("updated_activity", {
                userId: socket.auth.userId,
                activity: `${prevSong.title} by ${prevSong.artist} `,
            });
        }
        if (prevIndex >= 0) {
            set({
                currentSong: prevSong,
                currentIndex: prevIndex,
                isPlaying: true,
            });
        }
        else {
            const socket = useChatStore.getState().socket;
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Idle`,
                });
            }
            set({ isPlaying: false });
        }
    },
    togglePlay: () => {
        const willStartPlaying = !get().isPlaying;
        const socket = useChatStore.getState().socket;
        const currentSong = get().currentSong;
        if (socket.auth) {
            socket.emit("updated_activity", {
                userId: socket.auth.userId,
                activity: willStartPlaying && currentSong
                    ? `${currentSong.title} by ${currentSong.artist}`
                    : "Idle",
            });
        }
        set({ isPlaying: willStartPlaying });
    },
}));
