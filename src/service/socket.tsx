import { io, Socket } from "socket.io-client";

const baseUrlSocket = "http://localhost:5000";

interface Move {
  position: string;
  player: string;
}

interface Message {
  message: string;
  player: string;
}

interface GameResult {
  winner: string;
}

export const socket: Socket = io(baseUrlSocket);

export const createGame = () => {
  socket.emit("createGame");
};

export const joinGame = (gameId: string) => {
  socket.emit("joinGame", gameId);
};

export const playMove = (gameId: string, position: string, player: string) => {
  socket.emit("playMove", { gameId, position, player });
};

export const gameWon = (gameId: string, winner: string) => {
  socket.emit("gameWon", { gameId, winner });
};

export const restartGame = (gameId: string) => {
  socket.emit("restartGame", gameId);
};

export const sendMessage = (
  gameId: string,
  message: string,
  player: string
) => {
  socket.emit("sendMessage", { gameId, message, player });
};

export const onGameCreated = (callback: (gameId: string) => void) => {
  socket.on("gameCreated", callback);
};

export const onMovePlayed = (callback: (move: Move) => void) => {
  socket.on("movePlayed", callback);
};

export const onGameEnded = (callback: (result: GameResult) => void) => {
  socket.on("gameEnded", callback);
};

export const onJoinedGame = (callback: (result: GameResult) => void) => {
  socket.on("joinedGame", callback);
};

export const onGameRestarted = (callback: () => void) => {
  socket.on("gameRestarted", callback);
};

export const onReceiveMessage = (callback: (message: Message) => void) => {
  socket.on("receiveMessage", callback);
};

export const onNotification = (callback: (message: string) => void) => {
  socket.on("notification", callback);
};

export default socket;
