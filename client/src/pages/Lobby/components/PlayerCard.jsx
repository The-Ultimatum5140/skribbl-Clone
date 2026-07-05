
const PlayerCard = ({ player, isHost }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] p-4">
      <div>
        <h3 className="font-semibold">
          {isHost ? "👑 " : ""}
          {player.name}
        </h3>

        <p className="text-sm text-gray-400">Score : {player.score}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
