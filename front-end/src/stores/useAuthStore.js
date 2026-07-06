import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
export const useAuthStore = create((set) => ({
    isAdmin: false,
    isLoading: false,
    error: null,
    checkAdmin: async () => {
        try {
            set({ isLoading: true });
            const response = await axiosInstance.get("/admin/check-admin");
            set({ isAdmin: response.data.admin });
        }
        catch (err) {
            set({ error: err.response.data });
        }
        finally {
            set({ isLoading: false, error: null });
        }
    },
    reset: () => {
        set({ isAdmin: false, error: null, isLoading: true });
    }
}));
