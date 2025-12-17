import Game from './game.js';
class Manager { 
    private game: Game; 
    constructor() {
        
        this.game = new Game();
    } 
    public startGame() { 
        this.game.start(); 
    } 
} 

export default Manager;