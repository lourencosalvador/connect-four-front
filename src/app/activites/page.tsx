"use client";

import { Button } from "@/components/ui/button";
import { io } from 'socket.io-client';

import { useEffect } from "react";
import { DialogCreateSala } from "../components/dialog-create-sala";

export default function Home() {
  const socket = io('https://connectfour.serveo.net');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket!');
    });
 
    return () => {
      socket.off('connect');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-dvh bg-zinc-950 flex flex-col gap-6 justify-center items-center">
      <h1 className="text-2xl text-white">Vamos lá começar o jogo 🔥</h1>
      <div className="size-auto flex gap-6 items-center">
        <Button>Jogar offline</Button>
        <DialogCreateSala>
       <Button>Criar sala</Button>
        </DialogCreateSala> 
      </div>
    </div>
  );
}
