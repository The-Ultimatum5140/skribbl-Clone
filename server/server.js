import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import registerSocket from "./src/socket/index.js";
import env from "./src/config/env.js";

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: env.CLIENT_URL,
    credentials: true,
  },
});

// socket connection establish kiya

registerSocket(io);

// server start kiya

httpServer.listen(env.PORT, () => {
  console.log(`🚀 Server running on PORT ${env.PORT}`);
});
