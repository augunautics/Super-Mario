// GameConfig.js
// Begin GameConfig.js

import BackgroundCanvas from './BackgroundCanvas.js';
import WorldCanvas from './WorldCanvas.js';
import JsonLoader from './JsonLoader.js';
import GameEngine from './GameEngine.js';

export default class GameConfig {
    constructor({ worldImage, marioImage, jsonData }) {
        this.worldImage = worldImage;
        this.marioImage = marioImage;
        this.jsonData = jsonData;
        this.backgroundCanvas = null;
        this.worldCanvas = null;
        this.groundObjects = [];
        this.gameEngine = null;
    }

    init() {
        // Initialize the background canvas
        this.backgroundCanvas = new BackgroundCanvas({ canvasId: 'backgroundCanvas', image: this.worldImage });
        this.backgroundCanvas.draw();

        // Initialize the world canvas and draw the world image on top of the background
        this.worldCanvas = new WorldCanvas({ canvasId: 'worldCanvas', image: this.worldImage });
        this.worldCanvas.draw();

        // Load ground objects from JSON data
        this.groundObjects = JsonLoader.loadGroundObjectsFromJSON(this.jsonData);
        console.log('Ground objects:', this.groundObjects);

        // Initialize GameEngine with groundObjects and worldCanvas
        this.gameEngine = new GameEngine({
            groundObjects: this.groundObjects,
            worldCanvas: this.worldCanvas
        });
    }

    getGameEngine() {
        return this.gameEngine;
    }
}

// End GameConfig.js
