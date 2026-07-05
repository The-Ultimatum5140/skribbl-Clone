const ChatMessage = ({ message }) => {
  return (
    <div className="rounded-lg bg-[var(--color-background)] p-3">
      <span className="font-semibold">{message.playerName}: </span>

      <span>{message.message}</span>
    </div>
  );
};

export default ChatMessage;
