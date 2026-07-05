import SOCKET_EVENTS from "../../constants/socketEvents.js";
import roomManager from "../../game/RoomManager.js";
import generateRoomId from "../../utils/generateRoomId.js";
import emitRoomState from "../emitters/emitRoomState.js";

const createRoom = (io, socket) => {
  socket.on(SOCKET_EVENTS.CREATE_ROOM, ({ nickname }) => {
    // Validate nickname
    if (!nickname || !nickname.trim()) {
      socket.emit("error", {
        message: "Nickname is required",
      });
      return;
    }

    // Generate Unique Room Id
    let roomId;

    do {
      roomId = generateRoomId();
    } while (roomManager.roomExists(roomId));

    // Create Room
    const room = roomManager.createRoom(roomId, socket.id, nickname.trim());

    // Join Socket.IO Room
    socket.join(roomId);

    // Send Success Response
    socket.emit(SOCKET_EVENTS.ROOM_CREATED, {
      roomId: room.id,
      playerId: socket.id,
    });

    // Send Room State
    emitRoomState(io, room);

    console.log(`✅ Room Created : ${room.id}`);
  });
};

export default createRoom;
