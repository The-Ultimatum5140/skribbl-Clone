import { useNavigate } from "react-router-dom";

import ScoreRow from "./ScoreRow";

const ScoreboardModal = ({ isOpen, leaderboard = [], winner, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose?.();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-[var(--color-surface)] p-8 shadow-2xl">
        <h2 className="mb-2 text-center text-3xl font-bold">🏆 Game Over</h2>

        {winner && (
          <div className="mb-6 rounded-xl bg-violet-600/10 p-4 text-center">
            <p className="text-sm text-gray-400">Winner</p>

            <h3 className="mt-2 text-2xl font-bold text-violet-500">
              {winner.name}
            </h3>

            <p className="mt-1 text-gray-300">{winner.score} Points</p>
          </div>
        )}

        <div className="space-y-3">
          {leaderboard.map((player, index) => (
            <ScoreRow key={player.id} rank={index + 1} player={player} />
          ))}
        </div>

        <button
          onClick={handleClose}
          className="mt-6 w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default ScoreboardModal;
