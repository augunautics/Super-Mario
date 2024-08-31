// GameConfig.js
// Begin GameConfig.js

import BackgroundCanvas from './BackgroundCanvas.js';
import WorldCanvas from './WorldCanvas.js';

export default class GameConfig {
    constructor({ worldImage, marioImage }) {
        this.worldImage = worldImage;
        this.marioImage = marioImage;
        this.backgroundCanvas = null;
        this.worldCanvas = null;
    }

    init() {
        // Initialize the background canvas
        this.backgroundCanvas = new BackgroundCanvas({ canvasId: 'backgroundCanvas' });
        this.backgroundCanvas.drawBackground(this.worldImage);

        // Initialize the world canvas and draw the world image on top of the background
        this.worldCanvas = new WorldCanvas({ canvasId: 'worldCanvas' });
        this.worldCanvas.drawWorld(this.worldImage);
    }
}

// End GameConfig.js
