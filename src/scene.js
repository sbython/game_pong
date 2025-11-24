class scene
{
    constructor(canvas)
    {
        this._canvas = canvas;
    }
    setup() {
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = new BABYLON.Scene(this._engine);

        this.ground_p= {
            width :       10,
            height:       15,
            subdivisions: 10,
        }
        //Aloha : 0, beta : 40, Rotate: 0
        this.ground = new BABYLON.MeshBuilder.CreateGround("ground",
            this.ground_p,
            this._scene
        )
        this.material = new BABYLON.StandardMaterial("groundMat")
        this.material.diffuseTexture = new BABYLON.Texture("../asset/plas.jpg",this._scene)
        this.ground.material = this.material;
        this.camera_p = new BABYLON.Vector3(0,0,0);
        this.camera = new BABYLON.ArcRotateCamera("Camera",
            0  ,   // alpha
            Math.PI/ 3,   // beta
            20,            // radius (distance)
            this.camera_p,
            this._scene
        )
        const obj = {
            height:  0.5,
            width: 15,
            depth: 0.5
        }
        // 5a7e8a
        const material = new BABYLON.StandardMaterial("wallMaterial", this._scene);
        material.diffuseColor =  BABYLON.Color3.FromHexString("#5a7e8a");
        this.wall1 = new BABYLON.MeshBuilder.CreateBox("wall1", obj,this._scene);
        this.wall1.rotation.y= Math.PI/2;
        this.wall1.position.y = 0.30;
        this.wall1.position.x = 5.25;
        this.wall1.material = material;
        this.wall2 = new BABYLON.MeshBuilder.CreateBox("wall2", obj,this._scene);
        this.wall2.rotation.y= Math.PI/2;
        this.wall2.position.y = 0.30;
        this.wall2.position.x = -5.1; 
       this.wall2.material = material;

        // this.camera.attachControl(this._canvas, true);
        this.camera.useFramingBehavior = true;
        this.camera.setTarget(this.ground);
        this.light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1    , 0),
            this._scene
        );
    }
    get scene()
    {
        return this._scene;
    }
    get engine()
    {
        return this._engine;
    }
    get walltop (){
        return this.wall1 ;
    }
    get wallbottom()
    {
        return this.wall2;
    }
}

export default scene