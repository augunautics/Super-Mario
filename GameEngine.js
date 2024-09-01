// GameEngine.js
// Begin GameEngine.js
import Constants from "./Constants.js";
import Transparency from './Transparency.js';

export default class GameEngine {
    constructor({ groundObjects, worldCanvas, mario }) {
        this.groundObjects = groundObjects;
        this.worldCanvas = worldCanvas;
        this.mario = mario;
        this.gravity = Constants.gravity;
        this.isRunning = false;


    }

    start() {
        if (!this.worldCanvas || !this.worldCanvas.context) {
            console.error('World canvas or context not found');
            return;
        }

        this.isRunning = true;
        this.gameLoop();
    }

    stop() {
        this.isRunning = false;
    }

    gameLoop() {
        if (!this.isRunning) return;

        // Update game state
        this.update();

        // Clear the canvas
        this.clearCanvas();

        // Render the scene
        this.render();

        // Request the next frame
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // Apply gravity to Mario
        this.mario.y += this.gravity;

        // Check for collisions with the ground
        this.checkCollisions();
    }

    checkCollisions() {
        for (const ground of this.groundObjects) {
            // Basic AABB (Axis-Aligned Bounding Box) collision detection
            // Check if Mario's left side is to the left of the ground's right side
            // Define variables for Mario's edges
            const marioLeft = this.mario.x;
            const marioRight = this.mario.x + this.mario.width;
            const marioTop = this.mario.y;
            const marioBottom = this.mario.y + this.mario.height;

            // Define variables for the ground's edges
            const groundLeft = ground.x;
            const groundRight = ground.x + ground.width;
            const groundTop = ground.y;
            const groundBottom = ground.y + ground.height;

            // Check if Mario's left side is to the left of the ground's right side
            if (marioLeft < groundRight &&
                // Check if Mario's right side is to the right of the ground's left side
                marioRight > groundLeft &&
                // Check if Mario's bottom is below the ground's top
                marioBottom > groundTop &&
                // Check if Mario's bottom is above or equal to the ground's top plus gravity (for small overlaps)
                marioBottom <= groundTop + this.gravity) {
                // Adjust Mario's y position to place him exactly on top of the ground
                this.mario.y = groundTop - this.mario.height;

                // Stop checking after the first collision is detected to prevent multiple adjustments
                break;
            }
        }

        // Prevent Mario from going off the bottom of the screen
        if (this.mario.y + this.mario.height > this.worldCanvas.canvas.height) {
            this.mario.y = this.worldCanvas.canvas.height - this.mario.height;
        }
    }




    clearCanvas() {
        const context = this.worldCanvas.context;
        context.clearRect(0, 0, this.worldCanvas.canvas.width, this.worldCanvas.canvas.height);
    }

    render() {
        // Redraw the world canvas
        this.worldCanvas.draw();

        const context = this.worldCanvas.context;
        // Draw Mario after drawing the ground objects
        if (this.mario) {
            this.mario.renderToCanvas(this.mario.x, this.mario.y, this.mario.width, this.mario.height);
            //this.mario.draw();
        }
        // Draw the ground objects
        for (const ground of this.groundObjects) {
            ground.draw();
        }
        
        //this.worldCanvas.draw();
    }
}

// End GameEngine.js
