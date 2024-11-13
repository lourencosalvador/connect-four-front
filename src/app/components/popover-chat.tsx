import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Message } from "../types"
import { onReceiveMessage, sendMessage } from "@/service/socket"

interface ChatComponentProps {
    gameId: string | null;
}

export function PopoverChat({ gameId }: ChatComponentProps) {
    const [session, setSession] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };
        fetchSession();

        const handleMessage = (msg: Message) => {
            setMessages((prev) => {
                const isDuplicate = prev.some(
                    (existingMsg) =>
                        existingMsg.message === msg.message &&
                        existingMsg.player === msg.player &&
                        existingMsg.timestamp === msg.timestamp
                );

                return isDuplicate ? prev : [...prev, msg];
            });
        };

        onReceiveMessage(handleMessage);

        return () => {

        };

    }, []);

    const handleSendMessage = () => {
        const avatar = session?.user?.image
        if (gameId && message) {
            sendMessage(gameId, message, avatar);
            setMessage("");
        } else {
            alert("Join a game first and enter a message!");
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Open chat</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-zinc-900 border-none">
                <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none text-slate-100 font-semibold">Chat</h4>
                    </div>
                    <div className="size-auto flex flex-col gap-2">
                        {messages.map((msg, index) => (
                            <div className="size-auto flex gap-2 items-center">
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                  
                                    <Image
                                        src={msg.player}
                                        alt="Avatar"
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                    />
                                </div>

                                <h2 key={index} className="text-slate-100 text-md font-semibold">{msg.message}</h2>
                            </div>
                        ))}
                    </div>

                    <div className="w-full h-auto flex justify-between gap-3">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            id="width"
                            placeholder="Digite uma mensagem"
                            className="col-span-2 h-8 placeholder:text-zinc-400 text-zinc-400"
                        />
                        <Button onClick={handleSendMessage} className="bg-zinc-800 border-none text-slate-200">Enviar</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
