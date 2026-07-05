import SOCKET_EVENTS from "../../constants/socketEvents.js";
import roomManager from "../../game/RoomManager.js";

const clearCanvas = (io, socket) => {
  socket.on(SOCKET_EVENTS.CLEAR_CANVAS, ({ roomId }) => {
    const room = roomManager.getRoom(roomId);

    if (!room) {
      return;
    }

    // Only current drawer can clear the canvas
    if (socket.id !== room.currentDrawerId) {
      return;
    }

    io.to(room.id).emit(SOCKET_EVENTS.CLEAR_CANVAS);
  });
};

export default clearCanvas;
