const LobbyHeader = ({ roomId }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    alert("Room Code Copied!");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-center text-3xl font-bold sm:text-4xl">
        🎨 Scribble.IO
      </h1>

      <div className="flex flex-col gap-4 rounded-lg border border-[var(--color-border)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-gray-400">Room Code</p>

          <h2 className="break-all text-xl font-bold tracking-wider sm:text-2xl sm:tracking-widest">
            {roomId}
          </h2>
        </div>

        <button
          onClick={handleCopy}
          className="w-full rounded-md border px-4 py-2 transition hover:bg-gray-700 sm:w-auto"
        >
          📋 Copy
        </button>
      </div>
    </div>
  );
};

export default LobbyHeader;
