import words from "../data/words.js";

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];
};

export default getRandomWord;
