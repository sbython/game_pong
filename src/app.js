import scene from "./scene.js"
import paddle from "./paddle.js"
import ball from "./ball.js"

const canvas = document.getElementById("renderCanvas"); // Get the canvas element


const playground = new scene(canvas);
playground.setup();

const engine_  =  playground.engine;
const scene1 = playground.scene;
const paddle_lift = new paddle(scene1, "paddle_lift");
paddle_lift.setup();
const paddle_right = new paddle(scene1, "paddle_right");
paddle_right.setup();
const _ball = new ball(scene1);
_ball.setup();

        
_ball.wall1 = playground.walltop;
_ball.wall2 = playground.wallbottom;
_ball.paddle1 = paddle_lift.paddle;
_ball.paddle2 = paddle_right.paddle;
_ball.move(playground.walltop);
// Register a render loop to repeatedly render the scene
engine_.runRenderLoop(function () {
    scene1.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine_.resize();
});
