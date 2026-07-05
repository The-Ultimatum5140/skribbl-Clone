import SOCKET_EVENTS from "../../constants/socketEvents.js";
import roomManager from "../../game/RoomManager.js";

const getGameData = (socket) => {
  socket.on(SOCKET_EVENTS.GET_GAME_DATA, ({ roomId }) => {
    const room = roomManager.getRoom(roomId);

    if (!room) {
      return;
    }

    const isDrawer = room.currentDrawerId === socket.id;

    socket.emit(SOCKET_EVENTS.GAME_DATA, {
      roomId: room.id,
      isDrawer,
      word: isDrawer
        ? room.currentWord || ""
        : "_ ".repeat((room.currentWord || "").length),
    });
  });
};

export default getGameData;
