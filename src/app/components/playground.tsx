/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Move, Player } from "@/app/types/index";
import { useGameState } from "../hooks/use-game";
import { Profile } from "./profile";
import { Confetti, ConfettiRef } from "../animation/confetti";
import { useEffect, useRef, useState } from "react";
import { onMovePlayed } from "@/service/socket";
import { getSession } from "next-auth/react";

interface ConnectFourProps {
  onGameEnd?: (winner: Player) => void;
  idGame: string;
}

export const Playground = ({ onGameEnd, idGame }: ConnectFourProps) => {
  const confettiRef = useRef<ConfettiRef>(null);
  const [moves, setMoves] = useState<Move[]>([]);
  const [session, setSession] = useState<any>(null);

  const { gameState, dropPiece, getCellClasses } = useGameState({ onGameEnd, idGame });
  const { board, currentPlayer, winner } = gameState;

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    onMovePlayed((move: Move) => setMoves((prevMoves: Move[]) => [...prevMoves, move]));

    return () => {};
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="w-full flex justify-between h-auto">
        <Profile
          avatar={session?.user?.image ?? ""}
          name={session?.user?.name ?? ""}
          player="1"
          currentPlayer={String(currentPlayer)}
        />
      </div>
      {winner && (
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
      )}
      <h2
        className={`text-xl text-slate-100 font-bold ${winner ? "text-green-600" : ""}`}
      >
        {winner ? `Jogador ${winner} venceu! 🎉` : `Vez do Jogador ${currentPlayer}`}
      </h2>

      <div className="bg-blue-600 p-4 rounded-lg shadow-lg">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="p-2 cursor-pointer"
                onClick={() => dropPiece(colIndex)}
              >
                <div className={getCellClasses(cell, rowIndex, colIndex)} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
