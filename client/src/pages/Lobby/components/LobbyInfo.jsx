const LobbyInfo = ({ playerName, playerCount, maxPlayers }) => {
  return (
    <div className="space-y-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-medium text-gray-400">You</span>

        <span className="break-all font-semibold">{playerName}</span>
      </div>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-medium text-gray-400">Players</span>

        <span className="font-semibold">
          {playerCount} / {maxPlayers}
        </span>
      </div>
    </div>
  );
};

export default LobbyInfo;
