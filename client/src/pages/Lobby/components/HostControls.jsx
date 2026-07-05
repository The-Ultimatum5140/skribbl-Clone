import Button from "@/components/common/Button/Button";
import socket from "@/services/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

const HostControls = ({ roomId }) => {
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