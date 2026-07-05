import SOCKET_EVENTS from "../../constants/socketEvents.js";
import roomManager from "../../game/RoomManager.js";
import emitRoomState from "../emitters/emitRoomState.js";

const joinRoom = (io, socket) => {
  socket.on(SOCKET_EVENTS.JOIN_ROOM, ({ roomId, nickname }) => {
    // Validate nickname
    if (!nickname || !nickname.trim()) {
      socket.emit("error", {
        message: "Nickname is required",
      });
      return;
    }

    const result = roomManager.joinRoom(roomId, {
      id: socket.id,
      name: nickname.trim(),
    });

    // Room not found / Room full / Duplicate player
    if (!result) {
      socket.emit("error", {
        message: "Room not found",
      });
      return;
    }

    if (result.success === false) {
      socket.emit("error", {
        message: result.message,
      });
      return;
    }

    const room = result;

    // Join Socket.IO room
    socket.join(roomId);

    // Notify current player
    socket.emit(SOCKET_EVENTS.ROOM_JOINED, {
      roomId: room.id,
      playerId: socket.id,
    });

    // Update everyone
    emitRoomState(io, room);

    console.log(`✅ ${nickname} joined ${room.id}`);
  });
};

export default joinRoom;
