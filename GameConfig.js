// GameConfig.js
// Begin GameConfig.js

import BackgroundCanvas from './BackgroundCanvas.js';

export default class GameConfig {
    constructor({}) {
        this.backgroundCanvas = null;
    }

    init() {
        // Initialize the background canvas
        this.backgroundCanvas = new BackgroundCanvas({ canvasId: 'backgroundCanvas' });
        this.backgroundCanvas.drawBackground();
    }
}

// End GameConfig.js
