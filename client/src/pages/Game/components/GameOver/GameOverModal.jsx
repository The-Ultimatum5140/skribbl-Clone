import Button from "@/components/common/Button/Button";

import WinnerCard from "./WinnerCard";

const winner = {
  name: "Deepu",
  score: 320,
};

const GameOverModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-lg rounded-2xl bg-[var(--color-surface)] p-8">
        <h1 className="mb-8 text-center text-4xl font-bold">🎉 Game Over</h1>

        <WinnerCard winner={winner} />

        <div className="mt-8 space-y-4">
          <Button fullWidth>Play Again</Button>

          <Button fullWidth variant="secondary">
            Back To Lobby
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
