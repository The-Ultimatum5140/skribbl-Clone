import SOCKET_EVENTS from "../../constants/socketEvents.js";

const gameOver = (io, room) => {
  // Stop Timer
  if (room.timerInterval) {
    clearInterval(room.timerInterval);
    room.timerInterval = null;
  }

  // Update Game State
  room.gameState = "finished";

  // Sort Leaderboard
  const leaderboard = [...room.players].sort((a, b) => b.score - a.score);

  // Winner
  const winner = leaderboard[0] || null;

  // Save Winner
  room.winner = winner;

  // Notify All Players
  io.to(room.id).emit(SOCKET_EVENTS.GAME_OVER, {
    winner,
    leaderboard,
  });

  console.log("🏁 Game Over");

  if (winner) {
    console.log(`🏆 Winner: ${winner.name} (${winner.score} points)`);
  }
};

export default gameOver;
