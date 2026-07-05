import express from "express";
import cors from "cors";

import env from "./src/config/env.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Skribbl Clone Backend is Running 🚀",
    environment: env.NODE_ENV,
  });
});

export default app;