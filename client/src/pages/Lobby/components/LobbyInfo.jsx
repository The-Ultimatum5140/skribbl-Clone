const LobbyInfo = ({ playerName, playerCount, maxPlayers }) => {
  return (
    <div className="space-y-2 mb-6">
      <p>
        <strong>You:</strong> {playerName}
      </p>

      <p>
        <strong>Players:</strong> {playerCount}/{maxPlayers}
      </p>
    </div>
  );
};

export default LobbyInfo;
