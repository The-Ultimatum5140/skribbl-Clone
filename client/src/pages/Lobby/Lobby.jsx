import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import socket from "@/services/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import storage from "@/utils/storage";
import { STORAGE_KEYS } from "@/constants/storageKeys";

import LobbyHeader from "./components/LobbyHeader";
import LobbyInfo from "./components/LobbyInfo";
import PlayerList from "./components/PlayerList";
import LobbySettings from "./components/LobbySettings";
import HostControls from "./components/HostControls";

const Lobby = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [room, setRoom] = useState(null);

  const playerName = storage.get(STORAGE_KEYS.PLAYER_NAME);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleRoomState = (roomData) => {
      setRoom(roomData);
    };

    const handleGameStarted = ({ roomId }) => {
      navigate(`/game/${roomId}`);
    };

    socket.on(SOCKET_EVENTS.GAME_STARTED, handleGameStarted);
    socket.on(SOCKET_EVENTS.ROOM_STATE, handleRoomState);

    socket.emit(SOCKET_EVENTS.GET_ROOM_STATE, {
      roomId,
    });

    return () => {
      socket.off(SOCKET_EVENTS.GAME_STARTED, handleGameStarted);
      socket.off(SOCKET_EVENTS.ROOM_STATE, handleRoomState);
    };
  }, [roomId, navigate]);

  if (!room) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4">
        <h2 className="text-center text-xl font-semibold text-white sm:text-2xl">
          Loading Lobby...
        </h2>
      </div>
    );
  }

  const playerId = storage.get(STORAGE_KEYS.PLAYER_ID);
  const isHost = room.hostId === playerId;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-6 sm:px-6">
      <div className="w-full max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
        <LobbyHeader roomId={room.roomId || roomId} />

        <LobbyInfo
          playerName={playerName}
          playerCount={room.players.length}
          maxPlayers={room.settings.maxPlayers}
        />

        <PlayerList
          players={room.players}
          hostId={room.hostId}
          maxPlayers={room.settings.maxPlayers}
        />

        <LobbySettings
          rounds={room.settings.rounds}
          drawTime={room.settings.drawTime}
          maxPlayers={room.settings.maxPlayers}
        />

        {isHost && <HostControls roomId={room.roomId || roomId} />}
      </div>
    </div>
  );
};

export default Lobby;
