
class Player {
    constructor(scene, paddle, paddle2, ball, score) {
        this.scene = scene;
        this.paddle = paddle;
        this.paddle2 = paddle2;
        this.ball = ball;
        this.score = score;
        this.speed = 0.5;
        this.direction = 1;
        this.score = 0;
    }

    move() {
        if (this.direction === 1) {
            this.paddle.move(this.speed);
        } else {
            this.paddle2.move(-this.speed);
        }
    }

}

export default Player;

