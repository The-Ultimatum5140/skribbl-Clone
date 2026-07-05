import { useState } from "react";
import { useParams } from "react-router-dom";

import Input from "@/components/common/Input/Input";
import socket from "@/services/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

const ChatInput = ({ playerName }) => {
  const { roomId } = useParams();

  const [message, setMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
      roomId,
      message: trimmedMessage,
      playerName,
    });

    setMessage("");
  };

  return (
    <Input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type your guess..."
      autoComplete="off"
    />
  );
};

export default ChatInput;
