const PlayerCard = ({ player, hostId, currentDrawerId }) => {
  const isHost = player.id === hostId;
  const isDrawer = player.id === currentDrawerId;

  return (
    <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
          {player.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3 className="font-semibold">
            {player.name}
            {isDrawer && (
              <span className="ml-2 text-xs text-green-500">✏️ Drawing</span>
            )}
          </h3>

          <p className="text-xs text-gray-400">{isHost ? "Host" : "Player"}</p>
        </div>
      </div>

      <div className="text-lg font-bold">{player.score}</div>
    </div>
  );
};

export default PlayerCard;
