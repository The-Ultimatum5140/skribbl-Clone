const LobbySettings = ({ rounds, drawTime, maxPlayers }) => {
  return (
    <div className="rounded-lg border border-[var(--color-border)] p-4 space-y-3">
      <h2 className="text-xl font-semibold">Game Settings</h2>

      <div className="flex justify-between">
        <span>Rounds</span>
        <span>{rounds}</span>
      </div>

      <div className="flex justify-between">
        <span>Draw Time</span>
        <span>{drawTime} sec</span>
      </div>

      <div className="flex justify-between">
        <span>Max Players</span>
        <span>{maxPlayers}</span>
      </div>
    </div>
  );
};

export default LobbySettings;
