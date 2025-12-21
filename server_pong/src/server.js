
import Fastify from "fastify";
import websocket from "@fastify/websocket";

// =======================
// Create server
// =======================
const fastify = Fastify({
  // logger: true, // enable logs (IMPORTANT)
});

// =======================
// Start everything safely
// =======================
async function start() {
  // Register WebSocket plugin
  await fastify.register(websocket);

  // WebSocket route
  fastify.get("/pong", { websocket: true }, (connection, req) => {
    console.log("✅ WebSocket connected");
    // Receive messages
    connection.socket.on("message", (msg) => {
      // const data = JSON.parse(msg.toString());
      // if (data.type === "join") {
      //   // Handle join room logic here
      //   console.log("Player requested to join a room");
      //   // You can implement room joining logic using room.js here
      // }
      console.log("📩 Received:", msg.toString());

      // // Echo back (test)
      // connection.socket.send(
      //   JSON.stringify({
      //     type: "echo",
      //     payload: msg.toString(),
      //   })
      // );
    });

    // Handle disconnect
    connection.socket.on("close", () => {
      console.log("❌ WebSocket disconnected");
    });
  });

  // Start server
  await fastify.listen({
    port: 3000,
    host: "0.0.0.0", // VERY IMPORTANT
  });

  console.log("🚀 Server running");
  console.log("🔌 ws://localhost:3000/pong");
}

start().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
