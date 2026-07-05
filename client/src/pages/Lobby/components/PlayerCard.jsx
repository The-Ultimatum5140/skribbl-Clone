const PlayerCard = ({ player, isHost }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3 sm:p-4 transition hover:border-violet-500">
      <div className="min-w-0">
        <h3 className="truncate text-base font-semibold sm:text-lg">
          {isHost && <span className="mr-1">👑</span>}
          {player.name}
        </h3>

        <p className="text-sm text-gray-400">
          Score: <span className="font-medium">{player.score}</span>
        </p>
      </div>

      <div className="rounded-full bg-violet-600 px-3 py-1 text-sm font-semibold text-white">
        {player.score}
      </div>
    </div>
  );
};

export default PlayerCard;
