// import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';
import '@babylonjs/inspector'; // Import the inspector
import Game from './game';




window.addEventListener('DOMContentLoaded', () => {

    const game = new Game();
    game.rander();

    
    game.start();
    // Enable the inspector with a keyboard shortcut (Ctrl+Shift+I)
    window.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'I') {
            game['scene'].debugLayer.show();
        }
    });
});