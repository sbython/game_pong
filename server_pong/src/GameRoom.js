// GameRoom.js
export class GameRoom {
  constructor(playerLeft, playerRight) {
    this.left = playerLeft;
    this.right = playerRight;
    this.speedX = 0.04;
    this.speedY = 0.04;
    // Game State
    this.state = {
      ballX: 0,
      ballY: 0,
      leftY: 0,   // Position of Left Paddle
      rightY: 0,   // Position of Right Paddle
      scoreLeft: 0,
      scoreRight: 0
    };

    // Send initial sides
    this.send(this.left, { type: "assignPaddle", paddle: "left" });
    this.send(this.right, { type: "assignPaddle", paddle: "right" });

    this.startGameLoop();
  }

  // ... (send and broadcast methods represent same as before) ...
  send(socket, message) {
    if (socket.readyState === 1) {
        socket.send(JSON.stringify(message));
    }
  }

  broadcast(message) {
    this.send(this.left, message);
    this.send(this.right, message);
  }

  // 🆕 NEW: Handle Paddle Movement
  updatePaddle(socket, newY) {
    if (socket === this.left) {
      this.state.leftY = newY;
    } else if (socket === this.right) {
      this.state.rightY = newY;
    }
  }
  checkPaddleCollision() {
    this.state.ballX += this.speedX;
    this.state.ballY += this.speedY;
    
    // Check collision with left paddle
    if (this.state.ballX <= -6) {
      if (this.state.ballY >= this.state.leftY - 0.2 && this.state.ballY <= this.state.leftY + 0.2) {
        this.speedX = -this.speedX; // Reverse X direction
      } else {
        // Left player missed
        this.state.scoreRight += 1;
        this.broadcast({ type: "pointScored", player: "right" });
        this.resetBall();
      }
    }
    // Check collision with right paddle  
    else if (this.state.ballX >= 6) {
      if (this.state.ballY >= this.state.rightY - 0.2 && this.state.ballY <= this.state.rightY + 0.2) {
        this.speedX = -this.speedX; // Reverse X direction
      } else {
        // Right player missed
        this.broadcast({ type: "pointScored", player: "left" });
        this.resetBall();
      }
    }
  }
  updateBall() {


  }

  startGameLoop() {
    this.interval = setInterval(() => {
      // 1. Update Ball Physics here (optional for now)
      this.checkPaddleCollision();
      // 2. Broadcast the LATEST paddle positions to both players
      this.broadcast({
        type: "gameState",
        state: this.state
      });
    }, 1000 / 60); // 60 times per second
  }

  cleanup() {
    clearInterval(this.interval);
    this.broadcast({ type: "gameOver" });
  }
}