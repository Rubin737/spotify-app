import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
export const useAdminStore = create((set) => ({
    error: null,
    isLoading: false,
    stats: {
        totalAlbums: 0,
        totalArtists: 0,
        totalSongs: 0,
        totalUsers: 0,
    },
    songs: [],
    albums: [],
    fetchSongs: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/song/all-songs");
            set({ songs: response.data.data });
        }
        catch (err) {
            set({ error: err.response?.data?.message });
        }
        finally {
            set({ isLoading: false });
        }
    },
    fetchStats: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/stat/get-stats");
            set({ stats: response?.data?.data });
        }
        catch (err) {
            set({ error: err.response?.data?.message });
        }
        finally {
            set({ isLoading: false });
        }
    },
    deleteSong: async (id) => {
        set({ isLoading: true });
        try {
            await axiosInstance.delete(`/admin/delete-song/${id}`);
            set((state) => ({
                songs: state.songs.filter((s) => s._id !== id),
            }));
            const response = await axiosInstance.get("/stat/get-stats");
            set({ stats: response?.data?.data });
        }
        catch (err) {
            set({ error: err?.response?.data?.message });
        }
        finally {
            set({ isLoading: false });
        }
    },
    deleteAlbum: async (id) => {
        set({ isLoading: true });
        try {
            await axiosInstance.delete(`/admin/delete-album/${id}`);
            set((state) => ({
                albums: state.albums.filter((album) => album._id !== id),
            }));
            const response = await axiosInstance.get("/stat/get-stats");
            set({ stats: response?.data?.data });
        }
        catch (err) {
            set({ error: err?.response?.data?.message });
        }
        finally {
            set({ isLoading: false });
        }
    },
}));
