import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
export const useMusicStore = create((set) => ({
    songs: [],
    albums: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    trendingSongs: [],
    featuredSongs: [],
    madeForUSongs: [],
    fetchAlbums: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/album/get-albums");
            set({ albums: response.data.data });
        }
        catch (err) {
            set({ error: err?.response?.data?.message });
        }
        finally {
            set({ isLoading: false });
        }
    },
    fetchAlbumsById: async (albumId) => {
        try {
            set({ isLoading: true, error: null });
            const response = await axiosInstance.get(`/album/get-albums/${albumId}`);
            set({ currentAlbum: response.data.data });
        }
        catch (error) {
            set({ error: error.response?.data?.message });
        }
        finally {
            set({ isLoading: false });
        }
    },
    fetchFeaturedSongs: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/song/featured-songs");
            set({ featuredSongs: response.data.data });
        }
        catch (err) {
            set({ error: err.response.data.message });
        }
        finally {
            set({ isLoading: false });
        }
    },
    fetchMadeForUSongs: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/song/madeforu-songs");
            set({ madeForUSongs: response.data.data });
        }
        catch (err) {
            set({ error: err.response.data.message });
        }
        finally {
            set({ isLoading: false });
        }
    },
    fetchTrendingSongs: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/song/trending-songs");
            set({ trendingSongs: response.data.data });
        }
        catch (err) {
            set({ error: err.response.data.message });
        }
        set({ isLoading: false });
    },
    fetchSongs: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/song/all-songs");
            set({ songs: response.data.data });
        }
        catch (err) {
            set({ error: err.response.data.message });
        }
        set({ isLoading: false });
    }
}));
