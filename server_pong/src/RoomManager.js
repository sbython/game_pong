// RoomManager.js
import { GameRoom } from './GameRoom.js';

class RoomManager {
  constructor() {
    this.waitingPlayer = null;
    // Map to track socket -> room
    this.activeRooms = new Map(); 
  }

  handleJoin(socket) {
    if (this.waitingPlayer) {
      if (this.waitingPlayer === socket) return;

      console.log("⚡ Match found!");
      const room = new GameRoom(this.waitingPlayer, socket);
      
      // Save the room for both players so we can find it later
      this.activeRooms.set(this.waitingPlayer, room);
      this.activeRooms.set(socket, room);

      this.waitingPlayer = null;
    } else {
      this.waitingPlayer = socket;
    }
  }

  // New helper to find the room
  getRoom(socket) {
    return this.activeRooms.get(socket);
  }

  handleDisconnect(socket) {
    // Check if player was in a game
    const room = this.activeRooms.get(socket);
    if (room) {
      room.cleanup(); // Stop the game loop
      // Remove both players from the map
      this.activeRooms.delete(room.left);
      this.activeRooms.delete(room.right);
    }

    if (this.waitingPlayer === socket) {
      this.waitingPlayer = null;
    }
  }
}

export const roomManager = new RoomManager();