import Room from "./Room.js";

class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  createRoom(id, hostId, hostName) {
    const room = new Room({
      id,
      hostId,
      hostName,
    });

    this.rooms.set(id, room);

    return room;
  }

  getRoom(id) {
    return this.rooms.get(id);
  }

  joinRoom(roomId, player) {
    const room = this.getRoom(roomId);

    if (!room) {
      return null;
    }

    const result = room.addPlayer(player);

    if (!result.success) {
      return result;
    }

    return room;
  }

  deleteRoom(id) {
    this.rooms.delete(id);
  }

  roomExists(id) {
    return this.rooms.has(id);
  }
}

const roomManager = new RoomManager();

export default roomManager;
