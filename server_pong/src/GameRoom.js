// GameRoom.js
export class GameRoom {
  constructor(playerLeft, playerRight) {
    this.left = playerLeft;
    this.right = playerRight;
    this.speedX = 0.04;
    this.speedY = 0.04;
    this.scoreLeft = 0;
    this.scoreRight = 0;
    // Game State
    this.state = {
      ballX: 0,
      ballY: 0,
      leftY: 0,   // Position of Left Paddle
      rightY: 0,   // Position of Right Paddle

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


  resetBall()
  {
    this.state.ballX = 0;
    this.state.ballY = 0;
  }


  checkPaddleCollision(paddlex, paddley) {
        const badllRadius = 0.1;
        const paddlethinkness = 0.01;

        const halfofz = 0.6;

        const zCollision = (this.state.ballY >= paddley - halfofz ) &&
                            (this.state.ballY <= paddley + halfofz);
        if (!zCollision) return;

        const ballX = this.state.ballX;
        
        if (this.speedX < 0)
        {
          const ballLeftEdge = ballX - badllRadius;
          const paddleRightEdfe = paddlex + paddlethinkness;

          if(ballLeftEdge <= paddleRightEdfe && ballX > paddlex){
            this.speedX = -this.speedX;
            this.state.ballX = paddleRightEdfe + badllRadius;
          }

        }
        else
        {
            const ballLeftEdge = ballX + badllRadius;
            const paddleRightEdfe = paddlex - paddlethinkness;

            if(ballLeftEdge >= paddleRightEdfe && ballX < paddlex){
              this.speedX = -this.speedX;
              this.state.ballX = paddleRightEdfe - badllRadius;
        }
     }
    }
  
  updateBall() {
    this.state.ballX += this.speedX;
    this.state.ballY += this.speedY;
    
    if (this.state.ballY > 3)
    {
      this.state.ballY = 3;
      this.speedY = -this.speedY;
    }
    if (this.state.ballY < -3)
    {
      this.state.ballY = -3;
      this.speedY = -this.speedY;
    }
    // Check collision with left paddle
    if (this.state.ballX < -6 || this.state.ballX > 6)
    {  
      this.speedX = -this.speedX; // Reverse X direction
      if (this.state.ballX < -6)
      {
        this.scoreLeft++;
        console.log("GOAL LEFT: " ,this.scoreLeft);
        this.broadcast(
          {
            type : "pointScored",
            player: "left",
            newScore: this.scoreLeft
          }
        )
      }else
      {

        this.scoreRight++;
        console.log("GOAL RIGHT: " ,this.scoreRight);
        
        this.broadcast(
          {
            type : "pointScored",
            player: "right",
            newScore: this.scoreRight
          }
        )
      }
      if (this.scoreLeft >= 7 )
      {
        this.end_game("left");
      }
      else if (this.scoreRight >= 7)
      {
        this.end_game("right");
      }
      this.resetBall();
    }
  }

  

  startGameLoop() {
    this.interval = setInterval(() => {
      // 1. Update Ball Physics here (optional for now)

      this.checkPaddleCollision(5.5, this.state.leftY);
      this.checkPaddleCollision(-5.5, this.state.rightY);
      this.updateBall();
      this.check
      // 2. Broadcast the LATEST paddle positions to both players
      this.broadcast({
        type: "gameState",
        state: this.state
      });
    }, 1000 / 60); // 60 times per second
  }

  cleanup() {
    clearInterval(this.interval);
    this.broadcast({ type: "error",code : 501 });
  }
  end_game(winner) {
    clearInterval(this.interval);
    this.broadcast({ type: "gameOver", winner: winner });
  }
}