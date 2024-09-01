// GameConfig.js
// Begin GameConfig.js

import WorldCanvas from './WorldCanvas.js';
import JsonLoader from './JsonLoader.js';
import GameEngine from './GameEngine.js';
import Mario from './Mario.js';
import Constants from "./Constants.js"; 

export default class GameConfig {
    constructor({ worldImage, marioImage, jsonData }) {
        this.worldImage = worldImage;
        this.marioImage = marioImage;
        this.jsonData = jsonData;
        this.worldCanvas = null;
        this.groundObjects = [];
        this.gameEngine = null;
        this.spriteSize = Constants.spriteSize;
        this.aspectRadio = Constants.aspectRatio;
        this.startLocation = Constants.startLocation;

        // Automatically initialize the game configuration
        this.init();
    }

    init() {
        // Initialize the world canvas and draw the world image on top of the background
        this.worldCanvas = new WorldCanvas({ canvasId: 'worldCanvas', image: this.worldImage });
       

        // Load ground objects from JSON data
        this.groundObjects = JsonLoader.loadGroundObjectsFromJSON({jsonData:this.jsonData,context:this.worldCanvas.context});
        console.log('Ground objects:', this.groundObjects);

        // Create a Mario instance at position (0, 0) with width 50 and height 50
        this.scaledSprite = this.spriteSize*this.aspectRadio;
        this.labelOffset = 8;

        const mario = new Mario({
            x: this.startLocation,
            y: this.startLocation,
            width: this.scaledSprite,
            height: this.scaledSprite,
            image: this.marioImage,
            worldCanvas: this.worldCanvas,
            color:'green',
            crop: { x: 0, y: this.labelOffset, width:this.spriteSize , height: this.spriteSize } // Cropping parameters
        });

        

        // Initialize GameEngine with groundObjects, worldCanvas, and Mario
        this.gameEngine = new GameEngine({
            groundObjects: this.groundObjects,
            worldCanvas: this.worldCanvas,
            mario: mario
        });
    }

    getGameEngine() {
        return this.gameEngine;
    }
}

// End GameConfig.js
