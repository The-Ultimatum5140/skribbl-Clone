const WordDisplay = ({ word = "", isDrawer = false }) => {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-400">Word</p>

      <h2 className="text-2xl font-bold tracking-[8px]">
        {isDrawer ? word.toUpperCase() : word}
      </h2>
    </div>
  );
};

export default WordDisplay;
