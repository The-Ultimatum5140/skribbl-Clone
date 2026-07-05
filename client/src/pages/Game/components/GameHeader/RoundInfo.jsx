const RoundInfo = ({ currentRound, totalRounds }) => {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-400">Round</p>

      <h2 className="text-xl font-bold">
        {currentRound || 1} / {totalRounds || 3}
      </h2>
    </div>
  );
};

export default RoundInfo;
