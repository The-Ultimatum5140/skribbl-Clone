import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,

  CLIENT_URL: process.env.CLIENT_URL,

  NODE_ENV: process.env.NODE_ENV,
};

export default env;
