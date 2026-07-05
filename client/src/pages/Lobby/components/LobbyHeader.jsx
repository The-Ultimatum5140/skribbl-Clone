const LobbyHeader = ({ roomId }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    alert("Room Code Copied!");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-center">🎨 Scribble.IO</h1>

      <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] p-4">
        <div>
          <p className="text-sm text-gray-400">Room Code</p>

          <h2 className="text-2xl font-bold tracking-widest">{roomId}</h2>
        </div>

        <button
          onClick={handleCopy}
          className="rounded-md border px-4 py-2 hover:bg-gray-700"
        >
          📋 Copy
        </button>
      </div>
    </div>
  );
};

export default LobbyHeader;
