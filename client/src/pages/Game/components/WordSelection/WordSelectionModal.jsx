import WordButton from "./WordButton";

const words = ["APPLE", "TIGER", "SCHOOL"];

const WordSelectionModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-2xl bg-[var(--color-surface)] p-8">
        <h2 className="mb-6 text-center text-3xl font-bold">Choose a Word</h2>

        <div className="space-y-4">
          {words.map((word) => (
            <WordButton key={word} word={word} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordSelectionModal;
