import PlayerCard from "./PlayerCard";

const PlayerList = ({ players, hostId, maxPlayers }) => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h2 className="text-xl font-semibold">
        Players ({players.length}/{maxPlayers})
      </h2>

      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          isHost={player.id === hostId}
        />
      ))}
    </div>
  );
};

export default PlayerList;
