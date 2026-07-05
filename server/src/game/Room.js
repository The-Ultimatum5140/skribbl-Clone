class Room {
  constructor({ id, hostId, hostName }) {
    this.id = id;

    // Host
    this.hostId = hostId;
    this.currentDrawerId = hostId;

    // Players
    this.players = [
      {
        id: hostId,
        name: hostName,
        score: 0,
      },
    ];

    // Game Settings
    this.settings = {
      rounds: 3,
      drawTime: 80,
      maxPlayers: 8,
    };

    // Game State
    this.gameState = "waiting";
    this.currentWord = "";
    this.currentRound = 1;
    this.timer = this.settings.drawTime;
    this.timerInterval = null;
    this.winner = null;

    this.createdAt = Date.now();
  }

  addPlayer(player) {
    // Room Full
    if (this.players.length >= this.settings.maxPlayers) {
      return {
        success: false,
        message: "Room is full",
      };
    }

    // Duplicate Player
    const playerExists = this.players.some(
      (existingPlayer) => existingPlayer.id === player.id,
    );

    if (playerExists) {
      return {
        success: false,
        message: "Player already exists",
      };
    }

    this.players.push({
      id: player.id,
      name: player.name,
      score: 0,
    });

    return {
      success: true,
      room: this,
    };
  }
}

export default Room;
