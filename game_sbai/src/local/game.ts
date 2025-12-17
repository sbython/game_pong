import { Engine, Scene,  Vector3 ,MeshBuilder,HemisphericLight,StandardMaterial,Texture,Color3, ArcRotateCamera} from '@babylonjs/core';
import Paddle from './paddle';
import Ball from './ball';
class Game {
    private engine: Engine;
    public scene: Scene;
    private camera: ArcRotateCamera;
    private canvas: HTMLCanvasElement;
    private leftPaddle?: Paddle;
    private rightPaddle?: Paddle;
    private ball?: Ball;
    public  user1?: string;
    public  user2?: string;
    constructor() {
        const canvas = document.getElementById('renderCanvas');
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error("Cannot find canvas element with id 'renderCanvas'");
        }
        this.canvas = canvas;
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);    
        this.camera = new   ArcRotateCamera("ArcRotateCamera", Math.PI / 2, Math.PI / 5, 12, Vector3.Zero(), this.scene);
        this.camera.attachControl(this.canvas, true);
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

        





    }
    public rander() {


        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
    public start(user1: string, user2: string) {
        this.user1 = user1;
        this.user2 = user2;
        this.leftPaddle = new Paddle(this.scene, new Vector3(5.5, 0.1, -1.3), this.user1);
        this.rightPaddle = new Paddle(this.scene, new Vector3(-5.5, 0.1, -1.3), this.user2);
        this.ball = new Ball(this.scene, new Vector3(-0.088, 0.15, 0.0), this.rightPaddle.paddleMesh, this.leftPaddle.paddleMesh);
        this.leftPaddle.contlol('s', 'w', 0.1);
        this.rightPaddle.contlol('ArrowDown', 'ArrowUp', 0.1); 

        this.ball.aout_move(this.leftPaddle,this.rightPaddle);
    }

}

export default Game;