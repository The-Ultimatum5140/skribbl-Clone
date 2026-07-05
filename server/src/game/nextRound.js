import getRandomWord from "../utils/getRandomWord.js";
import emitRoomState from "../socket/emitters/emitRoomState.js";
import SOCKET_EVENTS from "../constants/socketEvents.js";
import startTimer from "./startTimer.js";
import gameOver from "../socket/handlers/gameOver.js";

const nextRound = (io, room) => {
  // Stop Previous Timer
  if (room.timerInterval) {
    clearInterval(room.timerInterval);
    room.timerInterval = null;
  }

  room.currentRound++;

  // Game Finished
  if (room.currentRound > room.settings.rounds) {
    gameOver(io, room);
    return;
  }

  // Prepare Next Round
  room.currentWord = getRandomWord();
  room.currentDrawerId = room.hostId;
  room.timer = room.settings.drawTime;

  // Reset guessed state
  room.players.forEach((player) => {
    player.hasGuessed = false;
  });

  // Clear Canvas
  io.to(room.id).emit(SOCKET_EVENTS.CLEAR_CANVAS);

  // Update Room State
  emitRoomState(io, room);

  // Drawer gets actual word
  io.to(room.currentDrawerId).emit(SOCKET_EVENTS.GAME_DATA, {
    roomId: room.id,
    word: room.currentWord,
    isDrawer: true,
  });

  // Guessers get blanks
  io.to(room.id)
    .except(room.currentDrawerId)
    .emit(SOCKET_EVENTS.GAME_DATA, {
      roomId: room.id,
      word: "_ ".repeat(room.currentWord.length),
      isDrawer: false,
    });

  // Restart Timer
  startTimer(io, room);

  console.log(`🎯 Round ${room.currentRound} Started`);
};

export default nextRound;
