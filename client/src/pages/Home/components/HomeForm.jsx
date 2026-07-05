import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

import socket from "@/services/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import storage from "@/utils/storage";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const HomeForm = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const handleCreateRoom = () => {
    if (!nickname.trim()) return;

    storage.set(STORAGE_KEYS.PLAYER_NAME, nickname);

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit(SOCKET_EVENTS.CREATE_ROOM, {
      nickname,
    });
  };

  const handleJoinRoom = () => {
    if (!nickname.trim() || !roomCode.trim()) return;

    storage.set(STORAGE_KEYS.PLAYER_NAME, nickname);

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit(SOCKET_EVENTS.JOIN_ROOM, {
      roomId: roomCode.trim().toUpperCase(),
      nickname,
    });
  };

  useEffect(() => {
    const handleRoomCreated = (data) => {
      storage.set(STORAGE_KEYS.ROOM_ID, data.roomId);
      storage.set(STORAGE_KEYS.PLAYER_ID, data.playerId);

      navigate(`/lobby/${data.roomId}`);
    };

    const handleRoomJoined = (data) => {
      storage.set(STORAGE_KEYS.ROOM_ID, data.roomId);
      storage.set(STORAGE_KEYS.PLAYER_ID, data.playerId);

      navigate(`/lobby/${data.roomId}`);
    };

    socket.on(SOCKET_EVENTS.ROOM_CREATED, handleRoomCreated);
    socket.on(SOCKET_EVENTS.ROOM_JOINED, handleRoomJoined);

    return () => {
      socket.off(SOCKET_EVENTS.ROOM_CREATED, handleRoomCreated);
      socket.off(SOCKET_EVENTS.ROOM_JOINED, handleRoomJoined);
    };
  }, [navigate]);

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <Input
        label="Nickname"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <Input
        label="Room Code"
        placeholder="Enter room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />

      <Button fullWidth type="button" onClick={handleCreateRoom}>
        Create Room
      </Button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--color-border)]" />

        <span className="text-sm text-[var(--color-text-muted)]">OR</span>

        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <Button
        fullWidth
        type="button"
        variant="secondary"
        onClick={handleJoinRoom}
      >
        Join Room
      </Button>
    </form>
  );
};

export default HomeForm;
