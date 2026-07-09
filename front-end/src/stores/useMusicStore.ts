import { axiosInstance } from "@/lib/axios";
import { MusicStore } from "@/types/types";
import { create } from "zustand";

export const useMusicStore = create<MusicStore>((set) => ({
  songs: [],
  albums: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  trendingSongs: [],
  featuredSongs: [],
  madeForUSongs: [],
  isAlbumsError:null,
  isAlbumsLoading:false,
  featureSongError:null,
  isFeatureSongLoading:false,
  isMadeSongLoading:false,
  madeSongError:null,
  isTrendingLoading:false,
  trendingSongError:null,

  fetchAlbums: async () => {
    set({ isAlbumsLoading: true, isAlbumsError: null });
    try {
      const response = await axiosInstance.get("/album/get-albums");
      set({ albums: response.data.data });
    } catch (err: any) {
      set({ isAlbumsError: err?.response?.data?.message});
    } finally {
      set({ isAlbumsLoading: false });
    }
  },
  fetchAlbumsById: async (albumId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get(`/album/get-albums/${albumId}`);
      set({ currentAlbum: response.data.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isFeatureSongLoading: true });
    try {
      const response = await axiosInstance.get("/song/featured-songs");
      set({ featuredSongs: response.data.data });
    } catch (err: any) {
      set({ featureSongError: err.response.data.message });
    } finally {
      set({ isFeatureSongLoading: false });
    }
  },
  fetchMadeForUSongs: async () => {
    set({ isMadeSongLoading: true });
    try {
      const response = await axiosInstance.get("/song/madeforu-songs");
      set({ madeForUSongs: response.data.data });
    } catch (err: any) {
      set({ madeSongError: err.response.data.message });
    } finally {
      set({ isMadeSongLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isTrendingLoading: true });
    try {
      const response = await axiosInstance.get("/song/trending-songs");
      set({ trendingSongs: response.data.data });
    } catch (err: any) {
      set({ trendingSongError: err.response.data.message });
    }
    set({ isTrendingLoading: false });
  },
  
  fetchSongs:async()=>{
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/song/all-songs");
      set({ songs: response.data.data });
    } catch (err: any) {
      set({ error: err.response.data.message });
    }
    set({ isLoading: false });
  }


}));
