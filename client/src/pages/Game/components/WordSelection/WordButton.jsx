const WordButton = ({ word }) => {
  return (
    <button className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-6 py-4 text-lg font-semibold transition hover:bg-violet-600 hover:text-white">
      {word}
    </button>
  );
};

export default WordButton;
