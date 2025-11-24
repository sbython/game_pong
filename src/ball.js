class ball
{
    constructor(scene_)
    {
        this._scene = scene_;
        this.vx =  0.05;
        this.vz = 0.05;
        this._top = null; 
        this._bottom = null;
    }
    setup(){
        const obj = {
            diameter: 0.4, 
            segments: 32
        }
        this.ball = new BABYLON.MeshBuilder.CreateSphere("ball", obj, this._scene);
        this.ball.position.y = 0.20;
        this.ball.showBoundingBox = true;
     
    }
    setpaddle(paddle1,paddle2)
    {
        this._paddle1 = paddle1;
        this._paddle2 = paddle2;
    }
    set wall1(walltop)
    {
        this._top = walltop;
    }
    set wall2(wallbottom)
    {
        this._bottom = wallbottom;
    }
    set paddle1(paddle1)
    {
        this._paddle1 = paddle1;
    }
    set paddle2(paddle2)
    {
        this._paddle2 = paddle2;
    }
    move(t)
    {
        // this._scene.registerBeforeRender(() =>{
        // this.ball.position.x += this.vx;
        // this.ball.position.z += this.vz;
        // });   
        this._scene.onBeforeRenderObservable.add(() =>{
            // delta-time movement
            const dt = this._scene.getEngine().getDeltaTime() / 1000;
            
            this.ball.position.x += this.vx * dt * 60;
            this.ball.position.z += this.vz * dt * 60;
            
            if(this.ball.position.z > 6.5 ||  this.ball.position.z < -6.5)
            {
                this.ball.position.x = 0;
                this.ball.position.z = 0;
                if( Math.random() < 0.5)
                    this.vx = - this.vx; 
                this.vz = - this.vz; 
                return;  
            }


            // paddle bounce

            if ( this.ball.intersectsMesh(this._top, false)) {
                this.vx = -this.vx;
                this.ball.position.x += -0.2
                return;
            }

            if ( this.ball.intersectsMesh(this._bottom, false)) {
                this.vx = -this.vx;
                this.ball.position.x += +0.2
                return;
            }
            if ( this.ball.intersectsMesh(this._paddle1, false)) {
                console.log("p1");
                
                this.vz = -this.vz;
                this.ball.position.z += +0.2
                return;
            }

            if ( this.ball.intersectsMesh(this._paddle2, false)) {
                console.log("p2 ");
                
                this.vz = -this.vz;
                this.ball.position.z += -0.2
                return;
            }
        });
    }
}

export default ball
