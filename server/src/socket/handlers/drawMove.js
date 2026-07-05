import SOCKET_EVENTS from "../../constants/socketEvents.js";
import roomManager from "../../game/RoomManager.js";

const drawMove = (io, socket) => {
  socket.on(SOCKET_EVENTS.DRAW_MOVE, ({ roomId, ...line }) => {
    const room = roomManager.getRoom(roomId);

    if (!room) {
      return;
    }

    // Only current drawer can draw
    if (socket.id !== room.currentDrawerId) {
      return;
    }

    socket.to(roomId).emit(SOCKET_EVENTS.DRAW_MOVE, line);
  });
};

export default drawMove;
