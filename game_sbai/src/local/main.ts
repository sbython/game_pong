// import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';
import '@babylonjs/inspector'; // Import the inspector
import Game from './game';
import { getAnimationTypeByFlowGraphType } from '@babylonjs/core';


let user1: string = 'user1';
let user2: string = 'user2';
let gameStarted: boolean = false;
const player1Input = document.getElementById('player1Info') as HTMLInputElement;
const player2Input = document.getElementById('player2Info') as HTMLInputElement;
const startButton = document.getElementById('startGameButton') as HTMLButtonElement;





window.addEventListener('DOMContentLoaded', () => {

    const game = new Game();
    game.rander();
    startButton.addEventListener('click', () => {
    if (player1Input.value.trim() !== '') {
        user1 = player1Input.value.trim();
    }
    if (player2Input.value.trim() !== '') {
        user2 = player2Input.value.trim();
    }
    // Hide the input form
    const gameInfoDiv = document.getElementById('gameInfo') as HTMLDivElement;
    gameInfoDiv.style.display = 'none';
    
    game.start(user1, user2);
    });
    // Enable the inspector with a keyboard shortcut (Ctrl+Shift+I)
    window.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'I') {
            game['scene'].debugLayer.show();
        }
    });
});