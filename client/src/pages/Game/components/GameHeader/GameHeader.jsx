import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import socket from "@/services/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

import RoomInfo from "./RoomInfo";
import RoundInfo from "./RoundInfo";
import Timer from "./Timer";
import WordDisplay from "./WordDisplay";

const GameHeader = ({ roomState }) => {
  const { roomId } = useParams();

  const [gameData, setGameData] = useState({
    word: "",
    isDrawer: false,
  });

  useEffect(() => {
    const handleGameData = (data) => {
      setGameData(data);
    };

    socket.on(SOCKET_EVENTS.GAME_DATA, handleGameData);

    socket.emit(SOCKET_EVENTS.GET_GAME_DATA, {
      roomId,
    });

    return () => {
      socket.off(SOCKET_EVENTS.GAME_DATA, handleGameData);
    };
  }, [roomId]);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <div className="grid grid-cols-4 items-center">
        <RoomInfo roomId={roomState?.roomId} />

        <RoundInfo
          currentRound={roomState?.currentRound}
          totalRounds={roomState?.settings?.rounds}
        />

        <WordDisplay word={gameData.word} isDrawer={gameData.isDrawer} />

        <Timer timer={roomState?.timer} />
      </div>
    </div>
  );
};

export default GameHeader;
