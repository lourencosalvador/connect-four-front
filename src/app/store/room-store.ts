import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoomState {
    room: string;
    createRoom: (roomName: string) => void;
    clearRoom: () => void;
}

export const useRoomStore = create<RoomState>()(
    persist(
        (set) => ({
            room: "", 
            createRoom: (roomName) => set({ room: roomName }),
            clearRoom: () => set({ room: "" })
        }),
        {
            name: "room-storage",
            partialize: (state) => ({ room: state.room })
        }
    )
);
