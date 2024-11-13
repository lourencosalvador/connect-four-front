"use client";
import { useEffect, useRef, useState } from "react";
import { Playground } from "@/app/components/playground";
import { joinGame, onJoinedGame } from "@/service/socket";
import { ChatComponent } from "@/app/components/chat";
import { useRoomStore } from "@/app/store/room-store";
import { PopoverChat } from "@/app/components/popover-chat";

interface PageProps {
  params: {
    idSala: string;
  };
}

export default function Page({ params }: PageProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { createRoom , room } = useRoomStore()

  const [_, setIsPlaying] = useState(false)

  useEffect(() => {
    if (params.idSala) joinGame(params.idSala);
    onJoinedGame((value: any) => {
      createRoom(value)
  });
  }, [])

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function toggleIsPlaying() {
    setIsPlaying(true)
  }

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    toggleIsPlaying()
  }, [])

  return (
    <div className="w-full h-dvh bg-zinc-950 flex justify-center items-center">
      <Playground idGame={params.idSala} />

      <div className="size-auto absolute top-0 right-0 p-8">
      <PopoverChat gameId={params.idSala} />
      </div>

      <audio
        src='/song-initial.mp3'
        autoPlay={true}
        ref={audioRef}
        onPlay={() => setPlayingState(true)}
        onPause={() => setPlayingState(false)}
      />
    </div>
  );
}