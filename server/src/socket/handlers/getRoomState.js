import SOCKET_EVENTS from "../../constants/socketEvents.js";
import roomManager from "../../game/RoomManager.js";

const getRoomState = (socket) => {
  socket.on(SOCKET_EVENTS.GET_ROOM_STATE, ({ roomId }) => {
    const room = roomManager.getRoom(roomId);

    if (!room) {
      socket.emit("error", {
        message: "Room not found",
      });

      return;
    }

    socket.emit(SOCKET_EVENTS.ROOM_STATE, {
      roomId: room.id,

      hostId: room.hostId,

      currentDrawerId: room.currentDrawerId,

      currentWord: room.currentWord,

      currentRound: room.currentRound,

      timer: room.timer,

      players: room.players,

      gameState: room.gameState,

      settings: room.settings,

      winner: room.winner,
    });
  });
};

export default getRoomState;
