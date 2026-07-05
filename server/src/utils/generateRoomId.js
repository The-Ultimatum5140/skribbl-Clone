const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const ROOM_CODE_LENGTH = 6;

const generateRoomId = () => {
  let roomId = "";

  for (let i = 0; i < ROOM_CODE_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);

    roomId += CHARACTERS[randomIndex];
  }

  return roomId;
};

export default generateRoomId;
