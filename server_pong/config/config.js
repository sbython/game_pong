const config = {
PORT: 8080,
HOST  : 'localhost',
WS_PATH                : '/pong',
BACKEND_URL      : 'http://localhost:3000',
FRONTEND_URL          : 'http://localhost:8080',
KEY_PATH :           './certs/key.pem',
CERT_PATH :         './certs/cert.pem',
// JWT_SECRET             (if authentication)

}
const GAME = {
    TICK_RATE: 60,
    BALL_SPEED: 0.04,
    PADDLE_SPEED: 0.1,
    MAX_PLAYERS: 2,
}
export { GAME };
export default  config;