import emitRoomState from "../socket/emitters/emitRoomState.js";
import nextRound from "./nextRound.js";

const startTimer = (io, room) => {
  // Stop Previous Timer
  if (room.timerInterval) {
    clearInterval(room.timerInterval);
  }

  // Reset Timer
  room.timer = room.settings.drawTime;

  // Send Initial Timer State
  emitRoomState(io, room);

  room.timerInterval = setInterval(() => {
    room.timer--;

    emitRoomState(io, room);

    if (room.timer <= 0) {
      clearInterval(room.timerInterval);
      room.timerInterval = null;

      nextRound(io, room);
    }
  }, 1000);
};

export default startTimer;
