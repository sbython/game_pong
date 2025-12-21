import room from './room.js';

const { rooms } = room;

function handlePlayerInput(roomId, connection, data) {
    const room = rooms[roomId];
    if (!room) return;

    const playerId = connection.playerId;
    if (!playerId) return;

    // Process player input (e.g., move paddle)
    if (data.type === 'move') {
        // Update paddle position based on input
        // This is a placeholder; actual implementation will depend on game logic
        console.log(`Player ${playerId} in room ${roomId} moved:`, data.direction);
    }
}   


export { handlePlayerInput };