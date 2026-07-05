import SOCKET_EVENTS from "../constants/socketEvents.js";
import clearCanvas from "./handlers/clearCanvas.js";
import createRoom from "./handlers/createRoom.js";
import joinRoom from "./handlers/joinRoom.js";
import getRoomState from "./handlers/getRoomState.js";
import startGame from "./handlers/startGame.js";
import drawMove from "./handlers/drawMove.js";
import getGameData from "./handlers/getGameData.js";
import sendMessage from "./handlers/sendMessage.js";

const registerSocket = (io) => {
  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    console.log(`✅ Client Connected: ${socket.id}`);

    // Room
    createRoom(io, socket);
    joinRoom(io, socket);
    getRoomState(socket);

    // Game
    startGame(io, socket);

    // Drawing
    drawMove(io, socket);

    // Chat
    sendMessage(io, socket);

    // Keep only if still using it
    getGameData(socket);

    // Clear Canvas
    clearCanvas(io, socket);

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log(`❌ Client Disconnected: ${socket.id}`);
    });
  });
};

export default registerSocket;
