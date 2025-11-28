import {  Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';
export default  function setup(engine, canvas)
{
    const scene = new Scene(engine);
        // Add a camera
        const camera = new ArcRotateCamera("camera", 0, Math.PI / 3, 20, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        // const ground = MeshBuilder.CreateGround("gourd", {
        //     width : 10, height: 15
        // }, scene)
        // Add a light
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Add a sphere

        return scene;
}