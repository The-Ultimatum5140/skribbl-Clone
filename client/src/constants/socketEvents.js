export const SOCKET_EVENTS = Object.freeze({
  // Connection
  CONNECT: "connect",
  DISCONNECT: "disconnect",

  // Room
  CREATE_ROOM: "create_room",
  JOIN_ROOM: "join_room",
  PLAYER_JOINED: "player_joined",
  PLAYER_LEFT: "player_left",
  ROOM_STATE: "room_state",
  ROOM_CREATED: "room_created",
  GET_ROOM_STATE: "get_room_state",
  ROOM_JOINED: "room_joined",

  // Game
  START_GAME: "start_game",
  GAME_STARTED: "game_started",
  ROUND_START: "round_start",
  ROUND_END: "round_end",
  GAME_OVER: "game_over",
  WORD_OPTIONS: "word_options",
  // Drawing
  DRAW_START: "draw_start",
  DRAW_MOVE: "draw_move",
  DRAW_END: "draw_end",
  CLEAR_CANVAS: "clear_canvas",
  GET_GAME_DATA: "get_game_data",
  GAME_DATA: "game_data",
  SEND_MESSAGE: "send_message",
  CHAT_MESSAGE: "chat_message",
  CORRECT_GUESS: "correct_guess",
  WORD_OPTIONS: "word_options",
  SELECT_WORD: "select_word",

  TIMER_UPDATE: "timer_update",

  NEXT_ROUND: "next_round",

  // Chat
  SEND_GUESS: "send_guess",
  RECEIVE_GUESS: "receive_guess",
});
