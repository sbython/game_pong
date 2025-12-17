import { Scene, Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui/2D';
import type Paddle from './paddle';

class Ball {    
    public ballMesh: Mesh;
    private scene: Scene;
    public speedX: number;
    public speedZ: number;
    private gameOver: boolean = false;
    public paddLeft: Mesh;
    public paddRight: Mesh;
    public pos: Vector3;

    constructor(scene: Scene, position: Vector3, _paddRight: Mesh , _paddLeft: Mesh) {
        this.scene = scene;
        this.ballMesh = MeshBuilder.CreateSphere('ball', {diameter: 0.2}, this.scene);
        this.ballMesh.position = position;
        this.pos = position;
        this.speedX = 0.04;
        this.speedZ = 0.04;
        this.paddLeft = _paddLeft;
        this.paddRight = _paddRight;
    }

    public getMesh(): Mesh {
        return this.ballMesh;
    }

    public move(leftPaddle: Paddle, rightPaddle: Paddle) {
        this.ballMesh.position.x += this.speedX;
        this.ballMesh.position.z += this.speedZ;

        // Check for top/bottom wall collisions - bounce off walls
        if (this.ballMesh.position.z > 3) {
            this.ballMesh.position.z = 3;
            this.speedZ = -this.speedZ;
        }
        if (this.ballMesh.position.z < -3) {
            this.ballMesh.position.z = -3;
            this.speedZ = -this.speedZ;
        }
        
        // Check for out of bounds - reset ball
        if (this.ballMesh.position.x > 6|| this.ballMesh.position.x < -6) {
            if (this.ballMesh.position.x > 6) {
                this.gameOver =  rightPaddle.addScore();
            }
            else {
                this.gameOver = leftPaddle.addScore();
            }
            this.reset(new Vector3(-0.088, 0.15, 0.0))
            if (this.gameOver) {    
                this.showEndMessage("Game Over");
                return;
            }
            ;
        }
    }
    /* 
        to make collisiton happen between ball and paddle
        it shoud x of paddle be equal or groud then ball x + raduis in proprotions of the right
        for the left paddle it shoud be x of paddle be equal or less then ball x - raduis
        and for z it shoud be between paddle z - half of paddle size to paddle z + half of paddle size
    */ 
    public checkPaddleCollision(paddlePosition: Vector3, paddleSize: Vector3) {
        const ballRadius = 0.1;
        const paddleThickness = 0.01; // paddle depth after rotation

        // Paddle is rotated 90°, so local X becomes world Z
        const halfOfz = paddleSize.x;

        // Check Z collision (ball within paddle's vertical range)
        const zCollision = (this.ballMesh.position.z >= paddlePosition.z - halfOfz) && 
                          (this.ballMesh.position.z <= paddlePosition.z + halfOfz);
        if (!zCollision) return;

        const ballX = this.ballMesh.position.x;
        const paddleX = paddlePosition.x;

        if (this.speedX < 0) {
            // Ball moving left, check right paddle (at negative X, e.g., -5.5)
            // Ball hits when its left edge reaches paddle's right edge
            const ballLeftEdge = ballX - ballRadius;
            const paddleRightEdge = paddleX + paddleThickness;
            
            if (ballLeftEdge <= paddleRightEdge && ballX > paddleX) {
                this.speedX = -this.speedX;
                this.ballMesh.position.x = paddleRightEdge + ballRadius; // push out
            }
        }
        else {
            // Ball moving right, check left paddle (at positive X, e.g., 5.5)
            // Ball hits when its right edge reaches paddle's left edge
            const ballRightEdge = ballX + ballRadius;
            const paddleLeftEdge = paddleX - paddleThickness;
            
            if (ballRightEdge >= paddleLeftEdge && ballX < paddleX) {
                this.speedX = -this.speedX;
                this.ballMesh.position.x = paddleLeftEdge - ballRadius; // push out
            }
        }
    }
    showEndMessage(text : string) {
        const ui = AdvancedDynamicTexture.CreateFullscreenUI("UI");

        const msg = new TextBlock();
        msg.text = text;
        msg.color = "white";
        msg.fontSize = 80;
        msg.outlineColor = "black";
        msg.outlineWidth = 6;
        msg.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        msg.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_CENTER;

        ui.addControl(msg);
    }
    public aout_move(leftPaddle: Paddle, rightPaddle: Paddle)
    {
        const scene = this.scene
        

        scene.onBeforeRenderObservable.add(() => {
            // console.log("x:", this.ballMesh.position.x , "z:" , this.ballMesh.position.z);
            if (this.gameOver) {
                return;
            }  
           
            const sizel : Vector3 =  this.paddLeft.getBoundingInfo().boundingBox.extendSize;
            const sizer : Vector3 =  this.paddRight.getBoundingInfo().boundingBox.extendSize;

            this.checkPaddleCollision(this.paddLeft.position,sizel);
            this.checkPaddleCollision(this.paddRight.position,sizer);
            this.move(leftPaddle,rightPaddle);
            
                    
            
        });
    }
    
    public reset(position: Vector3) {
        this.ballMesh.position = position;
        this.speedX = -this.speedX; // Change direction
    }
}
export default Ball ;   