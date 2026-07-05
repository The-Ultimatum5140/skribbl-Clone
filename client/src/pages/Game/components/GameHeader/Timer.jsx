const Timer = ({ timer }) => {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-400">Time</p>

      <h2 className="text-3xl font-bold text-red-500">{timer ?? 80}</h2>
    </div>
  );
};

export default Timer;
