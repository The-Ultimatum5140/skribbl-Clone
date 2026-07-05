import PlayerCard from "./PlayerCard";

const PlayerList = ({ players, hostId, maxPlayers }) => {
  return (
    <div className="rounded-lg border border-[var(--color-border)] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold sm:text-xl">Players</h2>

        <span className="rounded-md bg-[var(--color-background)] px-3 py-1 text-sm font-medium">
          {players.length}/{maxPlayers}
        </span>
      </div>

      <div className="space-y-3 sm:max-h-72 sm:overflow-y-auto">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            isHost={player.id === hostId}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
