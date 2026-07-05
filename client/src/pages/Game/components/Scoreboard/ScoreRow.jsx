const ScoreRow = ({ rank, player }) => {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-4 ${
        rank === 1
          ? "border-yellow-500 bg-yellow-500/10"
          : "border-[var(--color-border)]"
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold">#{rank}</span>

        <div>
          <h3 className="font-semibold">{player.name}</h3>

          <p className="text-sm text-gray-400">{player.score} pts</p>
        </div>
      </div>

      {rank === 1 && <span className="text-3xl">🏆</span>}
    </div>
  );
};

export default ScoreRow;
