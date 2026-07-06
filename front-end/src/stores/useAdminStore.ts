import { axiosInstance } from "@/lib/axios";
import { Albums, Songs } from "@/types/types";
import { create } from "zustand";

export interface Stat {
  totalArtists: number;
  totalSongs: number;
  totalAlbums: number;
  totalUsers: number;
}

export interface Admin {
  fetchSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;

  stats: Stat;
  isLoading: boolean;
  error: null | string;
  songs: Songs[];
  albums:Albums[];
}

export const useAdminStore = create<Admin>((set) => ({
  error: null,
  isLoading: false,
  stats: {
    totalAlbums: 0,
    totalArtists: 0,
    totalSongs: 0,
    totalUsers: 0,
  },
  songs: [],
  albums:[],
  fetchSongs: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/song/all-songs");
      set({ songs: response.data.data });
    } catch (err: any) {
      set({ error: err.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/stat/get-stats");
      set({ stats: response?.data?.data });
    } catch (err: any) {
      set({ error: err.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteSong: async (id: string) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/admin/delete-song/${id}`);
      set((state) => ({
        songs: state.songs.filter((s) => s._id !== id),
      }));
      const response = await axiosInstance.get("/stat/get-stats");
      set({ stats: response?.data?.data });
    } catch (err: any) {
      set({ error: err?.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteAlbum: async (id: string) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/admin/delete-album/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
      }));
      const response = await axiosInstance.get("/stat/get-stats");
      set({ stats: response?.data?.data });
    } catch (err: any) {
      set({ error: err?.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
