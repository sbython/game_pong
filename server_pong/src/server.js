import Fastify from 'fastify';
import WebSocket from '@fastify/websocket';
import config from '../config/config.js';

const fastify = Fastify({
  logger: true, // IMPORTANT: helps you see why clients disconnect
});

// Register WebSocket plugin
await fastify.register(WebSocket);

// Simple in-memory game state (can grow later)
const gameState = {
  players: {},
  ball: { x: 0, z: 0 },
  paddleLeft: { z: 0 },
  paddleRight: { z: 0 },
};
fastify.register(async (fastify) => {
  // WebSocket route
fastify.get(config.WS_PATH, { websocket: true }, (connection, req) => {
  console.log('🟢 Client connected:', req.socket.remoteAddress);

  const ws = connection.socket; // ✅ IMPORTANT

  if (!ws) {
    console.error('❌ WebSocket connection not established');
    return;
  }

  ws.on('message', (message) => {
    const text = message.toString();
    console.log('📩 Received:', text);

    ws.send(
      JSON.stringify({
        type: 'echo',
        payload: text,
      })
    );
  });

  ws.on('close', () => {
    console.log('🔴 Client disconnected');
  });

  ws.on('error', (err) => {
    console.error('❌ WebSocket error:', err);
  });

  ws.send(
    JSON.stringify({
      type: 'welcome',
      message: 'Welcome to Pong server',
    })
  );
});
});


// Start server
fastify.listen(
  { port: config.PORT, host: config.HOST },
  (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`🚀 Server running at ${address}`);
    fastify.log.info(`🔌 WebSocket path: ${config.WS_PATH}`);
  }
);
