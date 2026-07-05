import PlayerCard from "./PlayerCard";

const PlayerSidebar = ({ roomState }) => {
  const players = roomState?.players || [];

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <h2 className="mb-4 text-xl font-bold">Players ({players.length})</h2>

      <div className="space-y-3">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            hostId={roomState?.hostId}
            currentDrawerId={roomState?.currentDrawerId}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerSidebar;
