import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import socket from "@/services/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import storage from "@/utils/storage";
import { STORAGE_KEYS } from "@/constants/storageKeys";

import GameHeader from "./components/GameHeader/GameHeader";
import PlayerSidebar from "./components/PlayerSidebar/PlayerSidebar";
import CanvasBoard from "./components/CanvasBoard";
import ChatBox from "./components/ChatBox/ChatBox";
import Toolbar from "./components/Toolbar";
import ScoreboardModal from "./components/Scoreboard/ScoreboardModal";

const Game = () => {
  const { roomId } = useParams();

  const playerId = storage.get(STORAGE_KEYS.PLAYER_ID);
  const playerName = storage.get(STORAGE_KEYS.PLAYER_NAME);

  const [roomState, setRoomState] = useState(null);

  const [gameOverData, setGameOverData] = useState(null);

  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleRoomState = (room) => {
      setRoomState(room);
    };

    const handleGameOver = (data) => {
      setGameOverData(data);
    };

    socket.on(SOCKET_EVENTS.ROOM_STATE, handleRoomState);
    socket.on(SOCKET_EVENTS.GAME_OVER, handleGameOver);

    socket.emit(SOCKET_EVENTS.GET_ROOM_STATE, {
      roomId,
    });

    return () => {
      socket.off(SOCKET_EVENTS.ROOM_STATE, handleRoomState);
      socket.off(SOCKET_EVENTS.GAME_OVER, handleGameOver);
    };
  }, [roomId]);

  if (!roomState) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const canDraw = roomState.currentDrawerId === playerId;
  console.log("playerId:", playerId);
  console.log("roomState.currentDrawerId:", roomState.currentDrawerId);
  console.log("canDraw:", canDraw);

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-6">
      <GameHeader roomState={roomState} />

      <div className="mt-6 grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <PlayerSidebar roomState={roomState} />
        </div>

        <div className="col-span-6 space-y-4">
          <CanvasBoard
            canDraw={canDraw}
            brushColor={brushColor}
            brushSize={brushSize}
          />

          <Toolbar
            canDraw={canDraw}
            brushColor={brushColor}
            brushSize={brushSize}
            setBrushColor={setBrushColor}
            setBrushSize={setBrushSize}
          />
        </div>

        <div className="col-span-3">
          <ChatBox playerName={playerName} />
        </div>
      </div>

      <ScoreboardModal
        isOpen={!!gameOverData}
        winner={gameOverData?.winner}
        leaderboard={gameOverData?.leaderboard}
        onClose={() => setGameOverData(null)}
      />
    </div>
  );
};

export default Game;
