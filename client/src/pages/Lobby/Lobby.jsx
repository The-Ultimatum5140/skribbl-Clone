import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import socket from "@/services/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import storage from "@/utils/storage";
import { STORAGE_KEYS } from "@/constants/storageKeys";

import LobbyHeader from "./components/LobbyHeader";
import LobbyInfo from "./components/LobbyInfo";
import PlayerList from "./components/PlayerList";
import LobbySettings from "./components/LobbySettings";
import HostControls from "./components/HostControls";
import { useNavigate } from "react-router-dom";

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
      console.log("ROOM_STATE:", roomData);
      setRoom(roomData);
    };
    const handleGameStarted = ({ roomId }) => {
      console.log("GAME_STARTED", roomId);

      navigate(`/game/${roomId}`);
    };

    socket.on(SOCKET_EVENTS.GAME_STARTED, handleGameStarted);

    socket.on(SOCKET_EVENTS.ROOM_STATE, handleRoomState);

    socket.emit(SOCKET_EVENTS.GET_ROOM_STATE, {
      roomId,
    });

    return () => {
      socket.off(SOCKET_EVENTS.ROOM_STATE, handleRoomState);
      socket.off(SOCKET_EVENTS.GAME_STARTED, handleGameStarted);
    };
  }, [roomId]);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <h2 className="text-2xl font-semibold text-white">Loading Lobby...</h2>
      </div>
    );
  }

  const playerId = storage.get(STORAGE_KEYS.PLAYER_ID);

  const isHost = room.hostId === playerId;

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 space-y-6">
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
