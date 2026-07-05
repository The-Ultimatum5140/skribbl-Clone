import SOCKET_EVENTS from "../../constants/socketEvents.js";
import roomManager from "../../game/RoomManager.js";
import emitRoomState from "../emitters/emitRoomState.js";

const sendMessage = (io, socket) => {
  socket.on(SOCKET_EVENTS.SEND_MESSAGE, ({ roomId, message, playerName }) => {
    const room = roomManager.getRoom(roomId);

    if (!room) return;

    if (!message?.trim()) return;

    const cleanMessage = message.trim().toLowerCase();
    const correctWord = room.currentWord.trim().toLowerCase();

    // Drawer cannot guess
    const isDrawer = socket.id === room.currentDrawerId;

    // correct guess k liye

    if (!isDrawer && cleanMessage === correctWord) {
      const player = room.players.find((p) => p.id === socket.id);

      if (!player) return;

      if (player.hasGuessed) {
        return;
      }

      player.hasGuessed = true;
      player.score += 100;

      emitRoomState(io, room);

      io.to(room.id).emit(SOCKET_EVENTS.CORRECT_GUESS, {
        playerId: socket.id,
        playerName,
        word: room.currentWord,
      });

      console.log(`✅ ${playerName} guessed correctly`);

      return;
    }

    // normal chat

    io.to(room.id).emit(SOCKET_EVENTS.CHAT_MESSAGE, {
      playerId: socket.id,
      playerName,
      message,
    });

    console.log(`${playerName}: ${message}`);
  });
};

export default sendMessage;
