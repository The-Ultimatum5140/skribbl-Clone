import SOCKET_EVENTS from "../../constants/socketEvents.js";
import roomManager from "../../game/RoomManager.js";
import emitRoomState from "../emitters/emitRoomState.js";
import startTimer from "../../game/startTimer.js";
import getRandomWord from "../../utils/getRandomWord.js";

const startGame = (io, socket) => {
  socket.on(SOCKET_EVENTS.START_GAME, ({ roomId }) => {
    const room = roomManager.getRoom(roomId);

    if (!room) {
      console.log("Room not found");
      return;
    }

    // Only host can start
    if (room.hostId !== socket.id) {
      console.log("Only host can start the game");
      return;
    }

    // Minimum players
    if (room.players.length < 2) {
      console.log("Not enough players to start the game");
      return;
    }

    // Stop previous timer
    if (room.timerInterval) {
      clearInterval(room.timerInterval);
      room.timerInterval = null;
    }

    // Reset game state
    room.gameState = "playing";
    room.currentRound = 1;
    room.currentDrawerId = room.hostId;
    room.currentWord = getRandomWord();
    room.timer = room.settings.drawTime;
    room.winner = null;

    // Reset scores
    room.players.forEach((player) => {
      player.score = 0;
    });

    // Send updated room state
    emitRoomState(io, room);

    // Navigate everyone to game page
    io.to(room.id).emit(SOCKET_EVENTS.GAME_STARTED, {
      roomId: room.id,
    });

    // Send actual word to drawer
    io.to(room.currentDrawerId).emit(SOCKET_EVENTS.GAME_DATA, {
      roomId: room.id,
      word: room.currentWord,
      isDrawer: true,
    });

    // Send blanks to guessers
    io.to(room.id)
      .except(room.currentDrawerId)
      .emit(SOCKET_EVENTS.GAME_DATA, {
        roomId: room.id,
        word: "_ ".repeat(room.currentWord.length),
        isDrawer: false,
      });

    // Start timer
    startTimer(io, room);
    //  testing ho gayi na
    // console.log(`🎮 Game Started | Room: ${room.id}`);
    // console.log(`✏️ Drawer: ${room.currentDrawerId}`);
    // console.log(`📝 Word: ${room.currentWord}`);
  });
};

export default startGame;
