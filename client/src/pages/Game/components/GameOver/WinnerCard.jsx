const WinnerCard = ({ winner }) => {
  return (
    <div className="rounded-xl border border-yellow-500 bg-yellow-500/10 p-6 text-center">
      <div className="mb-4 text-6xl">🏆</div>

      <h2 className="text-2xl font-bold">{winner.name}</h2>

      <p className="mt-2 text-lg text-gray-400">Final Score</p>

      <h3 className="mt-1 text-4xl font-bold text-yellow-400">
        {winner.score}
      </h3>
    </div>
  );
};

export default WinnerCard;
