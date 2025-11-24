class paddle
{
    constructor(scene_, name)
    {
        this._scene = scene_;
        this._name = name;
        this._speed = 0.2;
    }
    setup()
    {
        const obj= {
            // size: 20,// size	(number) size of each box side	1
            height: 0.5,// height	(number) height size, overwrites size option	size
            width: 2,// width	(number) width size, overwrites size option	size
            depth: 0.5// depth	(number) depth size, overwrites size option
        }
        this.input = { up: false, down: false }
        this._paddle = new BABYLON.MeshBuilder.CreateBox(this._name,obj, this._scene);
        const material = new BABYLON.StandardMaterial("paddleM", this._scene);
        
        this._paddle.position.y = 0.30;
        

        if (this._name === "paddle_lift")
        {
            material.diffuseColor = new BABYLON.Color3.FromHexString("#EF5350");
            this._paddle.position.z = -6;
            this.leftMovement()
        }
        else if (this._name === "paddle_right")
        {
            material.diffuseColor = new BABYLON.Color3.FromHexString("#FDD835");
            this._paddle.position.z = 6;
            this.rightMovement()
        }
        else
            console.log("this paddle it shouled be existing")
        this._paddle.material = material;
    }
    leftMovement()
    {
       window.addEventListener("keydown", (e) => {
        if (e.key === "s") this.input.down = true;
        if (e.key === "w") this.input.up = true;
        });
        window.addEventListener("keyup", (e) => {
            if (e.key === "s") this.input.down = false;
            if (e.key === "w") this.input.up = false;
        });
        this._scene.onBeforeRenderObservable.add(() => {


            if (this.input.down && this._paddle.position.x < 4) this._paddle.position.x += this._speed;
            if (this.input.up && this._paddle.position.x > -4) this._paddle.position.x -= this._speed;
        });
    }
    rightMovement()
    {
       window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" ) this.input.down = true;
        if (e.key === "ArrowDown")  this.input.up = true;
        });
        window.addEventListener("keyup", (e) => {
            if (e.key === "ArrowUp" ) this.input.down = false;
            if (e.key === "ArrowDown" ) this.input.up = false;
        });
        this._scene.onBeforeRenderObservable.add(() => {


            if (this.input.down && this._paddle.position.x > -4) this._paddle.position.x -= this._speed;
            if (this.input.up && this._paddle.position.x < 4) this._paddle.position.x += this._speed;
        });
    }
    get paddle()
    {
        return this._paddle;
    }
}

export default paddle