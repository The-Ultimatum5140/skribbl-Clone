const SOCKET_EVENTS = Object.freeze({
  // Connection
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  // Room
  CREATE_ROOM: "create_room",
  ROOM_CREATED: "room_created",

  JOIN_ROOM: "join_room",
  ROOM_JOINED: "room_joined",

  GET_ROOM_STATE: "get_room_state",
  ROOM_STATE: "room_state",

  PLAYER_JOINED: "player_joined",
  PLAYER_LEFT: "player_left",

  // Game
  START_GAME: "start_game",
  GAME_STARTED: "game_started",
  GAME_OVER: "game_over",
  GAME_ERROR: "game:error",

  WORD_OPTIONS: "word_options",
  SELECT_WORD: "select_word",

  GET_GAME_DATA: "get_game_data", // existing project
  GAME_DATA: "game_data",

  // Drawing
  DRAW_MOVE: "draw_move",
  CLEAR_CANVAS: "clear_canvas",

  // Chat
  SEND_MESSAGE: "send_message",
  CHAT_MESSAGE: "chat_message",
  CORRECT_GUESS: "correct_guess",

  // Timer
  TIMER_UPDATE: "timer_update",
});

export default SOCKET_EVENTS;
