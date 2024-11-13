export type Player = 1 | 2 | null;

export type Board = Player[][];
export type Position = [number, number];

export type Move = {
  position: string;
  player: string;
}

export type Message = {
  message: string;
  player: string;
  timestamp?: number;
}