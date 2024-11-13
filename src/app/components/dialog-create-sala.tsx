"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReactNode, useEffect, useState } from "react"
import { createGame, onGameCreated } from "@/service/socket";
import { useRoomStore } from "../store/room-store";

export function DialogCreateSala({ children }: { children: ReactNode }) {
    const {createRoom} = useRoomStore()
    const router = useRouter();
    const [roomValue, setRoomValue] = useState("")

    useEffect(() => {
        onGameCreated((id: string) => {
            createRoom(roomValue ? roomValue : "Room")
            router.push(`/connect4/${id}`);
        });

        return () => { }
    }, [router]);

    const handleCreateGame = () => createGame();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-none text-slate-200">
                <DialogHeader>
                    <DialogTitle>Adicionar o nome da sala</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col  gap-4">
                        <Label htmlFor="name" className="text-left">
                            Name Sala
                        </Label>
                        <Input
                            id="name"
                            placeholder="Diversion"
                            className="col-span-3"
                            value={roomValue}
                            onChange={(e) => setRoomValue(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button className="bg-zinc-800 hover:bg-zinc-700" onClick={handleCreateGame}>Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
