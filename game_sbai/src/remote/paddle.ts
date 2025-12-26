import { Mesh, MeshBuilder, Scene, StandardMaterial, Color3, Vector3  } from '@babylonjs/core';
import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui/2D';
class Paddle {     
    public paddleMesh: Mesh;
    public score: Mesh | null = null;
    public scoreValue: number = 0;
    public textBlock : TextBlock | null = null;
    private scene: Scene;
    public username: Mesh | null = null;
    public user: string = "Player";
    public socket: WebSocket ;

    constructor(scene: Scene, position: Vector3, _user: string, socket: WebSocket) {
        this.socket = socket;
        this.scene = scene;
        this.user = _user;
        this.paddleMesh = MeshBuilder.CreateBox('paddle', {width: 1, height: 0.2, depth: 0.01}, this.scene);
        this.paddleMesh.position = position;
        this.paddleMesh.rotate(Vector3.Up(), Math.PI / 2);
        
        const paddleMaterial = new StandardMaterial("paddleMaterial", this.scene);
        paddleMaterial.diffuseColor = Color3.FromHexString("#ff5733");
        this.paddleMesh.material = paddleMaterial;

        this.createUserName(position.x); 
        this.createScore(position.x);
    }

    public createScore(x:number) {
       this.score = MeshBuilder.CreatePlane('score', {width: 2, height: 2}, this.scene);
        if (x < 0) {
            this.score.position = new Vector3(-9, 0, 0);
        } else {
            this.score.position = new Vector3(9, 0, 0);
        }
        this.score.rotation.x = Math.PI/3;
        this.score.rotation.y =  Math.PI ;
        const TEXT = AdvancedDynamicTexture.CreateForMesh(this.score);
        this.textBlock = new TextBlock();
        this.textBlock.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        this.textBlock.text = "0";
        this.textBlock.color = "white";
        this.textBlock.fontSize = 1000; // Use a large font size for sharpness
        this.textBlock.textWrapping = true; // Allows text to wrap within the plane's boundaries 
        TEXT.addControl(this.textBlock); // Add the control to the texture
    }
    public createUserName(x:number) {
        this.username = MeshBuilder.CreatePlane('username', {width: 4, height: 2}, this.scene);
        if (x < 0) {
            this.username.position = new Vector3(-9 , 0, -3);
        } else {
            this.username.position = new Vector3(9, 0, -3);
        }
        this.username.rotation.x = Math.PI/3;
        this.username.rotation.y =  Math.PI ;
        const TEXT = AdvancedDynamicTexture.CreateForMesh(this.username);
        this.textBlock = new TextBlock();
        this.textBlock.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        this.textBlock.text = this.user;
        this.textBlock.color = "white";
        this.textBlock.fontSize = 300; // Use a large font size for sharpness
        this.textBlock.textWrapping = true; // Allows text to wrap within the plane's boundaries 
        TEXT.addControl(this.textBlock); // Add the control to the texture
    }
    public moveUp(distance: number) {
        if (this.paddleMesh.position.z + distance > 3) {
            return true;
        }
        this.paddleMesh.position.z += distance;
        return false;

    }

    public moveDown(distance: number) {
        if (this.paddleMesh.position.z - distance < -3) {
            return true;
        }
        this.paddleMesh.position.z -= distance;
        return false;
    }
    public contlol(keyUp: string, keyDown: string, ) {
        const scene = this.scene;
        const inputMap: { [key: string]: boolean } = {};
        
        window.addEventListener('keydown', (event) => {
            inputMap[event.key] = true;
        });
        
        window.addEventListener('keyup', (event) => {
            inputMap[event.key] = false;
        });
        scene.onBeforeRenderObservable.add(() => {
            
            if (inputMap[keyUp]) {
                if (this.moveUp(0.1)) return;
                const myY = this.paddleMesh.position.z;
                this.socket.send(JSON.stringify({
                    type: "move",
                    y: myY
                }));
            }
            if (inputMap[keyDown]) {
                if (this.moveDown(0.1)) return;
                const myY = this.paddleMesh.position.z;
                this.socket.send(JSON.stringify({
                    type: "move",
                    y: myY
                }));
            }
        });
    }

    public updateScore(score: number) {
        if (this.textBlock) {
            this.textBlock.text = score.toString();
        }
        this.scoreValue = score;

    }
    addScore() {
        this.scoreValue += 1;
        this.textBlock.text = this.scoreValue.toString();
        if (this.scoreValue >= 3) {    
            return true;
        } 
        return false;  
    }
    public getMesh(): Mesh {
        return this.paddleMesh;
    }
}

export default Paddle;