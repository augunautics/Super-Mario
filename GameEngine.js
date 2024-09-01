// GameEngine.js
// Begin GameEngine.js

export default class GameEngine {
    constructor({ groundObjects, worldCanvas, mario }) {
        this.groundObjects = groundObjects;
        this.worldCanvas = worldCanvas;
        this.mario = mario;
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

        // Draw Mario after drawing the ground objects
        if (this.mario) {
            this.mario.draw(context);
        }
    }
}

// End GameEngine.js
