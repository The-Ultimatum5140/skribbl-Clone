import { useEffect, useRef, useState } from "react";

import socket from "@/services/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const ChatBox = ({ playerName }) => {
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleChatMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleCorrectGuess = (data) => {
      setMessages((prev) => [
        ...prev,
        {
          playerName: "System",
          message: `${data.playerName} guessed the word "${data.word}"`,
        },
      ]);
    };

    socket.on(SOCKET_EVENTS.CHAT_MESSAGE, handleChatMessage);
    socket.on(SOCKET_EVENTS.CORRECT_GUESS, handleCorrectGuess);

    return () => {
      socket.off(SOCKET_EVENTS.CHAT_MESSAGE, handleChatMessage);
      socket.off(SOCKET_EVENTS.CORRECT_GUESS, handleCorrectGuess);
    };
  }, []);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex h-[650px] flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">Chat</h2>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <ChatInput playerName={playerName} />
      </div>
    </div>
  );
};

export default ChatBox;
