import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';
import setup from './setup';
import createground from './gorund'
// Get the canvas element
const canvas = document.getElementById('renderCanvas'); // Make sure you have a canvas with this ID in your index.html

// Create a Babylon.js engine
const engine = new Engine(canvas, true);

// Create a scene

  
const scene = setup(engine, canvas)
const ground = createground(scene);
// Render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Handle window resizing
window.addEventListener('resize', function () {
    engine.resize();
});