// GameConfig.js
// Begin GameConfig.js

import BackgroundCanvas from './BackgroundCanvas.js';
import WorldCanvas from './WorldCanvas.js';
import JsonLoader from './JsonLoader.js';

export default class GameConfig {
    constructor({ worldImage, marioImage, jsonData }) {
        this.worldImage = worldImage;
        this.marioImage = marioImage;
        this.jsonData = jsonData;
        this.backgroundCanvas = null;
        this.worldCanvas = null;
        this.groundObjects = [];
    }

    init() {
        // Initialize the background canvas
        this.backgroundCanvas = new BackgroundCanvas({ canvasId: 'backgroundCanvas' });
        this.backgroundCanvas.drawBackground(this.worldImage);

        // Initialize the world canvas and draw the world image on top of the background
        this.worldCanvas = new WorldCanvas({ canvasId: 'worldCanvas' });
        this.worldCanvas.drawWorld(this.worldImage);

        // Load ground objects from JSON data
        this.groundObjects = JsonLoader.loadGroundObjectsFromJSON(this.jsonData);
        console.log('Ground objects:', this.groundObjects);

        // You can now use groundObjects for further operations, e.g., collision detection
    }
}

// End GameConfig.js
