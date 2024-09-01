// GameEngine.js
// Begin GameEngine.js

import Constants from "./Constants.js";

export default class GameEngine {
    constructor({ groundObjects, worldCanvas }) {
        this.groundObjects = groundObjects;
        this.worldCanvas = worldCanvas;
    }

    start() {
        if (!this.worldCanvas || !this.worldCanvas.context) {
            console.error('World canvas or context not found');
            return;
        }

        const context = this.worldCanvas.context;

        // Draw the ground objects
        for (const ground of this.groundObjects) {
            ground.draw(context);
        }
    }
}

// End GameEngine.js
