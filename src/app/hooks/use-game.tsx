"use client";
import { useState, useEffect } from "react";
import { Board, Player, Position } from "../types";
import { playMove, onMovePlayed } from "@/service/socket";

const ROWS = 6;
const COLS = 7;

interface gameStateProps {
  onGameEnd?: (winner: Player) => void;
  idGame: string;
}

export const useGameState = ({ onGameEnd, idGame }: gameStateProps) => {
  const initialState = {
    board: Array.from({ length: ROWS }, () => Array(COLS).fill(null)),
    currentPlayer: 1 as Exclude<Player, null>,
    winner: null as Player,
    winningCells: [] as Position[],
  };

  const [gameState, setGameState] = useState(initialState);

  useEffect(() => {
    onMovePlayed((move) => {
      const [row, col] = move.position.split(",").map(Number)
      const updatedBoard = gameState.board.map((r) => [...r]);
      updatedBoard[row][col] = parseInt(move.player);

      setGameState((prevState) => ({
        ...prevState,
        board: updatedBoard,
        currentPlayer: move.player === "1" ? 2 : 1, 
      }));
    });
  }, [gameState.board]);

  const dropPiece = (col: number) => {
    if (gameState.winner || gameState.board[0][col]) return;

    const newBoard: Board = gameState.board.map((row) => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = gameState.currentPlayer;
        if (checkWinner(row, col, newBoard)) {
          setGameState({
            ...gameState,
            board: newBoard,
            winner: gameState.currentPlayer,
          });
          onGameEnd?.(gameState.currentPlayer);
        } else {
          setGameState({
            ...gameState,
            board: newBoard,
            currentPlayer: gameState.currentPlayer === 1 ? 2 : 1,
          });
        }
        playMove(idGame, String([row, col]), String(gameState.currentPlayer)); // Envia o movimento via Socket
        break;
      }
    }
  };

  const resetGame = () => setGameState(initialState);

  const isWinningCell = (row: number, col: number) =>
    gameState.winningCells.some(([r, c]) => r === row && c === col);

  const checkWinner = (row: number, col: number, board: Board) => {
    const directions: Position[][] = [
      [[0, 1], [0, -1]],
      [[1, 0], [-1, 0]],
      [[1, 1], [-1, -1]],
      [[1, -1], [-1, 1]],
    ];

    const player = board[row][col];
    if (!player) return false;

    for (const [dir1, dir2] of directions) {
      let count = 1;
      const winningPositions: Position[] = [[row, col]];

      for (const [dx, dy] of [dir1, dir2]) {
        let newRow = row + dx;
        let newCol = col + dy;

        while (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          board[newRow][newCol] === player
        ) {
          count++;
          winningPositions.push([newRow, newCol]);
          newRow += dx;
          newCol += dy;
        }
      }

      if (count >= 4) {
        setGameState((prev) => ({ ...prev, winningCells: winningPositions }));
        return true;
      }
    }
    return false;
  };

  const getCellClasses = (cell: Player, row: number, col: number): string => {
    const baseClasses = "w-24 h-24 rounded-full transition-all duration-300 ";
    if (!cell) {
      return `${baseClasses}bg-white hover:bg-gray-100`;
    }

    const isWinning = isWinningCell(row, col);
    const playerColor =
      cell === 1
        ? isWinning
          ? "bg-red-600 animate-pulse"
          : "bg-red-500"
        : isWinning
        ? "bg-yellow-400 animate-pulse"
        : "bg-yellow-300";

    return `${baseClasses}${playerColor}`;
  };

  const handleCellClick = (row: number, col: number) => {
    if (!gameState.winner && !gameState.board[0][col]) {
      dropPiece(col);
    }
  };

  return {
    gameState,
    dropPiece,
    resetGame,
    isWinningCell,
    getCellClasses,
    handleCellClick,
  };
};
