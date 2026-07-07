import { axiosInstance } from "@/lib/axios";
import { io } from "socket.io-client";
import { create } from "zustand";
const BASE_URL =  import.meta.env.MODE === "development" ? "http://localhost:5000"  : "/" 

const socketClient = io(BASE_URL, {
  withCredentials: true,
  autoConnect: false,
});
export const useChatStore = create((set, get) => ({
  socket:socketClient,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  message: [],
  isUserLoading: false,
  userError: null,
  isMsgLoading:false,
  msgError:null,
  selectedUser: null,
  users: [],
  initializeSocket: (userId) => {
    if (!get().isConnected) {
      socketClient.auth = { userId };
      socketClient.connect();
      socketClient.on("connect", () => {
        socketClient.emit("user_connected", userId);
        socketClient.on("users_online", (users) => {
          const updatedUsers = new Set(users);
          set({
            onlineUsers: updatedUsers,
          });
        });
        socketClient.on("users_activity", (activity) => {
          const updatedAct = new Map(activity);
          set({
            userActivities: updatedAct,
          });
        });
        socketClient.on("new_user_connected", (userId) => {
          set((state) => {
            const updateList = new Set([...state.onlineUsers, userId]);
            return {
              onlineUsers: updateList,
            };
          });
        });
        socketClient.on("user_disconnected", (userId) => {
          set((state) => {
            const updateList = new Set(state.onlineUsers);
            updateList.delete(userId);
            return {
              onlineUsers: updateList,
            };
          });
        });
        socketClient.on("receive_message", (message) => {
          set((state) => {
            const newMsgs = [...state.message, message];
            return { message: newMsgs };
          });
        });
        socketClient.on("message_send", (message) => {
          set((state) => {
            const newMsgs = [...state.message, message];
            return { message: newMsgs };
          });
        });
        socketClient.on("updated_activity", ({ userId, activity }) => {
          set((state) => {
            const newActivities = new Map(state.userActivities);
            newActivities.set(userId, activity);
            return { userActivities: newActivities };
          });
        });
        set({ isConnected: true });
      });
    }
  },
  disconnectSocket: () => {
    if (get().isConnected) {
      socketClient.disconnect();
      set({ isConnected: false });
    }
  },
  sendMessage: async (senderId:string, receiverId:string, content:string) => {
    const socket = get().socket;
    if (!socket) return;
    socket.emit("send_message", { senderId, receiverId, content });
  },
  fetchMessages: async (receiverId) => {
    set({ isMsgLoading: true, msgError: null });
    try {
      const response = await axiosInstance.get(`/user/message/${receiverId}`);
      set({ message: response.data.data });
    } catch (err) {
      set({ msgError: err?.response?.data?.message });
    } finally {
      set({ isMsgLoading: false });
    }
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  fetchUsers: async () => {
    set({ isUserLoading: true, userError:null });
    try {
      const respone = await axiosInstance.get("/user/get-all-users");
      set({ users: respone.data.data });
    } catch (err: any) {
      set({ userError: err.response.data.message });
    } finally {
      set({ isUserLoading: false });
    }
  },
}));
