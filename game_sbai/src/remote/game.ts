import { Engine, Scene,  Vector3 ,MeshBuilder,HemisphericLight,StandardMaterial,Texture,Color3, ArcRotateCamera} from '@babylonjs/core';
import Paddle from './paddle';
import Ball from './ball';
class Game {
    private engine: Engine;
    public scene: Scene;
    private camera: ArcRotateCamera;
    private canvas: HTMLCanvasElement;
    private leftPaddle: Paddle;
    private rightPaddle: Paddle;
    private ball: Ball;
    public  user1: string;
    public  user2: string;
    public socket: WebSocket ;
    public playerPaddle: Paddle | null = null;
    constructor() {
        // you should fetch usernames from form_back end ;
        this.user1 = "Player 1";
        this.user2 = "Player 2";
        const canvas = document.getElementById('renderCanvas');
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error("Cannot find canvas element with id 'renderCanvas'");
        }
        this.canvas = canvas;
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);    
        this.camera = new   ArcRotateCamera("ArcRotateCamera", Math.PI / 2, Math.PI / 5, 12, Vector3.Zero(), this.scene);
        // this.camera.attachControl(this.canvas, true);
        this.camera.setTarget(Vector3.Zero());
        const light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
        light.intensity = 0.8;

        const ground = MeshBuilder.CreateGround('ground1', {width: 12, height: 6}, this.scene);
        ground.material = new StandardMaterial("groundMaterial", this.scene);
        (ground.material as StandardMaterial).diffuseTexture = new Texture("../asset/ground.jpg", this.scene);


        const wallNorth = MeshBuilder.CreateBox('wallNorth', {width: 12, height: 0.2, depth: 0.2}, this.scene);
        wallNorth.position.z = -3;
        wallNorth.material = new StandardMaterial("wallNorthMaterial", this.scene);
        (wallNorth.material as StandardMaterial).diffuseColor =  Color3.FromHexString("#5a7e8a"); // Nice color for the wall
        wallNorth.position.y = 0.1;
        const wallSouth = MeshBuilder.CreateBox('wallSouth', {width: 12, height: 0.2, depth: 0.2}, this.scene);
        wallSouth.material = new StandardMaterial("wallSouthMaterial", this.scene);
        (wallSouth.material as StandardMaterial).diffuseColor =  Color3.FromHexString("#5a7e8a"); // Same color for the wall
        wallSouth.position.z = 3;
        wallSouth.position.y = 0.1;

        
        this.socket = new WebSocket('ws://localhost:3000/pong');

        this.leftPaddle = new Paddle(this.scene, new Vector3(5.5, 0.1, 0),this.user1,this.socket);
        this.rightPaddle = new Paddle(this.scene, new Vector3(-5.5, 0.1, 0), this.user2, this.socket);
        this.ball = new Ball(this.scene, new Vector3(-0.088, 0.15, 0.0), this.rightPaddle.paddleMesh, this.leftPaddle.paddleMesh);




    }
    public rander() {


        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
    public updateGameState(state: any) {
        // Update paddles
        this.leftPaddle.paddleMesh.position.z = state.leftY;
        this.rightPaddle.paddleMesh.position.z = state.rightY;
        
        // Update ball
        this.ball.ballMesh.position.x = state.ballX;
        this.ball.ballMesh.position.y = state.ballY;

        // Update scores
        // this.leftPaddle.updateScore(state.leftPaddle.score);
        // this.rightPaddle.updateScore(state.rightPaddle.score);

    }

    public showWinner(winner: string) {
        alert(`${winner} wins the game!`);
    }
    public start() {
        /*
            first need ask server about you paddle 
            you shoule  get data from server and update it 
            if you need move you paddle seend requist to user server first 
        */

        this.socket.onopen = () => {
            console.log("Connected to server!!!!!");
            if (this.socket.readyState === WebSocket.OPEN)
            {
                console.log("Socket is open, sending join message");
                this.socket.send(JSON.stringify({
                    type: "join",
                }));    

            }
            else
            {
                console.log("Socket not open");
            }
        };

        this.socket.onmessage = (event) => {
            
            try {
                const message = JSON.parse(event.data); 
                if (message.type === "gameState") {
                    this.updateGameState(message.state);
                } else if (message.type === "gameOver") {
                    this.showWinner(message.winner);
                } else if (message.type === "assignPaddle") {
                    if (message.paddle === "left") {
                        this.playerPaddle = this.leftPaddle;
                    } else  {
                        this.playerPaddle = this.rightPaddle;
                    }
                    this.playerPaddle.contlol("s", "w");
                    this.playerPaddle.contlol("S", "W");
                }
            } catch (error) {
                console.error("Error parsing message:", error);
            }

        };
       
        this.socket.onerror = e => {
            console.log("WebSocket error observed:", e);
        }
        this.socket.onclose = (event) => {
            console.log("WebSocket is closed now.");
            console.log("Code:", event.code);   // Integer code (e.g., 1000, 1006)
            console.log("Reason:", event.reason); // String reason given by server
            console.log("WasClean:", event.wasClean); // Boolean: true if closed normally
        };
    }

}

export default Game;    