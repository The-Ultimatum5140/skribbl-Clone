import { useEffect } from "react";
import Swal from "sweetalert2";

import Button from "@/components/common/Button/Button";
import socket from "@/services/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

const HostControls = ({ roomId }) => {
  useEffect(() => {
    socket.on(SOCKET_EVENTS.GAME_ERROR, ({ message }) => {
      Swal.fire({
        icon: "warning",
        title: "Cannot Start Game",
        text: message,
        confirmButtonText: "OK",
      });
    });

    return () => {
      socket.off(SOCKET_EVENTS.GAME_ERROR);
    };
  }, []);

  const handleStartGame = () => {
    socket.emit(SOCKET_EVENTS.START_GAME, {
      roomId,
    });
  };

  return (
    <Button fullWidth onClick={handleStartGame}>
      Start Game
    </Button>
  );
};

export default HostControls;
