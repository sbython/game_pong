// server.js
import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import { roomManager } from './RoomManager.js'; // Import the instance
// import config from './config.js'; // Assuming you have a config file

const fastify = Fastify({ logger: true });

async function start() {
  // 1. Register WebSocket plugin
  await fastify.register(fastifyWebsocket);

  // 2. Define Route
  fastify.get('/pong', { websocket: true }, (connection, req) => {
      
      const socket = connection; // In your version, connection IS the socket
      console.log("✅ New Client Connected");

      socket.on("message", (msg) => {
          try {
            const data = JSON.parse(msg.toString());
            
            if (data.type === "join") {
              roomManager.handleJoin(socket);
            }
            
            // 🆕 Handle Movement
            else if (data.type === "move") {
              // 1. Find the room this player is in
              const room = roomManager.getRoom(socket);
              
              // 2. If room exists, update the paddle
              if (room) {
                // data.y is the value sent from client
                room.updatePaddle(socket, data.y); 
              }
          }
          
        } catch (e) {
          console.error("Error:", e);
        }
      });

      socket.on("close", () => {
        console.log("❌ Client Disconnected");
        roomManager.handleDisconnect(socket);
      });
  });

  // 3. Start Server
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log("🚀 Server running at ws://localhost:3000/pong");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();