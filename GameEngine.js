// GameEngine.js
// Begin GameEngine.js

import Constants from "./Constants.js";

export default class GameEngine {
    constructor({ groundObjects, worldCanvas }) {
        this.groundObjects = groundObjects;
        this.worldCanvas = worldCanvas;
    }

    drawGround() {
        if (!this.worldCanvas || !this.worldCanvas.context) {
            console.error('World canvas or context not found');
            return;
        }
    
        const context = this.worldCanvas.context;
        context.strokeStyle = 'red';
        context.lineWidth = 2; // Adjust the thickness of the border if needed
    
        const aspectRatio = Constants.aspectRatio * 2;
        const border = Constants.borderSize;
    
        for (const ground of this.groundObjects) {
            const x = ground.x * aspectRatio + border;
            const y = ground.y * aspectRatio + ground.height;
            const width = ground.width * aspectRatio;
            const height = ground.height * aspectRatio;
    
            context.strokeRect(x, y, width, height);
        }
    }
    
    
}

// End GameEngine.js
