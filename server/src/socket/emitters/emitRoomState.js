import SOCKET_EVENTS from "../../constants/socketEvents.js";

const emitRoomState = (io, room) => {
  io.to(room.id).emit(SOCKET_EVENTS.ROOM_STATE, {
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
};

export default emitRoomState;
