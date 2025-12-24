
import Fastify from "fastify";
import websocket from "@fastify/websocket";
import config from "../config/config.js";
// =======================
// Create server
// =======================
const fastify = Fastify({
  logger: true, // enable logs (IMPORTANT)
});

// =======================
// Start everything safely
// =======================
async function start() {
  // Register WebSocket plugin
  await fastify.register(websocket);

  // WebSocket route
  fastify.get(config.WS_PATH, { websocket: true }, (connection, req) => {
    console.log("✅ WebSocket connected");
   
    connection.on("message", (msg) => {
      // onsole.log("d Received Raw Buffer:", msg);
      try
      {
        
        const data = JSON.parse(msg.toString());
        if (data.type === "join") {
            console.log("Player requested to join a room");
        }
        console.log("📩 Received:", msg.toString());
      }
      catch (e)
      {
        console.log("Error parsing message:", e);
        return;
      }

    });

    // Handle disconnect
    connection.on("close", () => {
      console.log("❌ WebSocket disconnected");
    });
  });

  // Start server
  await fastify.listen({
    port: config.PORT,
    host: config.HOST, // VERY IMPORTANT
  });

  console.log("🚀 Server running");
  console.log(`🔌 ws://${config.HOST}:${config.PORT}${config.WS_PATH}`);
}

start().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
