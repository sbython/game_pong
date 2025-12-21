const rooms = {};

function createRoom(roomId) {
    rooms[roomId] = {
        players: [],
        left: null,
        right: null,
        interval: null,
    };
}


function joinRoom(roomId, connection) {
    const room = rooms[roomId];

    if (!room || room.players.length >= 2) return false;

    connection.playerId = room.players.length + 1;
    room.players.push(connection);

    return true;
}

function leaveRoom(roomId, connection) {
    const room = rooms[roomId];
    if (!room) return;

    room.players = room.players.filter(p => p !== connection);

    if (room.players.length === 0) {
        clearInterval(room.interval);
        delete rooms[roomId];
    }
}
export default {
    createRoom,
    joinRoom,
    leaveRoom,
    rooms,
};