// Begin GameEngine.js

import Constants from "./Constants.js";

export default class GameEngine {
    constructor({ groundObjects, worldCanvas, mario, eventHandler }) {
        this.groundObjects = groundObjects;
        this.worldCanvas = worldCanvas;
        this.mario = mario;
        this.eventHandler = eventHandler;
        this.gravity = Constants.gravity;
        this.cameraX = 0;
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
        // Update Mario's position based on the current keys pressed
        this.eventHandler.updateMarioPosition();
    
        // Apply gravity and check for collisions in one step
        this.applyGravityAndCheckCollisions();
        
        // Update the camera position based on Mario's position
        this.updateCamera();
    }
    
    applyGravityAndCheckCollisions() {
        let onGround = false;
    
        // Apply gravity only if Mario is not jumping
        if (!this.eventHandler.isJumping) {
            this.mario.y += this.gravity;
        }
    
        for (const ground of this.groundObjects) {
            // Basic AABB (Axis-Aligned Bounding Box) collision detection
            const marioLeft = this.mario.x;
            const marioRight = this.mario.x + this.mario.width;
            const marioTop = this.mario.y;
            const marioBottom = this.mario.y + this.mario.height;
    
            const groundLeft = ground.x;
            const groundRight = ground.x + ground.width;
            const groundTop = ground.y;
            const groundBottom = ground.y + ground.height;
    
            // Check if Mario's bounding box intersects with the ground's bounding box
            if (marioRight > groundLeft &&
                marioLeft < groundRight &&
                marioBottom >= groundTop && 
                marioTop < groundBottom) {
    
                // If Mario is falling onto the ground (moving downwards)
                if (this.mario.y + this.mario.height > groundTop) {
                    // Adjust Mario's position to be exactly on top of the ground
                    this.mario.y = groundTop - this.mario.height;
                    onGround = true;
                    this.eventHandler.isJumping = false; // Reset jumping state when Mario hits the ground
                }
            }
        }
    
        // Prevent Mario from going off the bottom of the screen
        if (this.mario.y + this.mario.height > this.worldCanvas.canvas.height) {
            this.mario.y = this.worldCanvas.canvas.height - this.mario.height;
        }
    }
    
    updateCamera() {
        const halfScreenWidth = this.worldCanvas.canvas.width / 2;
        const offset = 100; // Adjust this value as needed to control the camera's movement start
    
        // Adjust cameraX based on Mario's position with an offset
        if (this.mario.x > halfScreenWidth - offset) {
            this.cameraX = this.mario.x - halfScreenWidth + offset;
        } else {
            this.cameraX = 0; // Keep the camera at the start position if Mario is within the offset range
        }
    
        // Ensure the camera does not go beyond the right edge of the world
        const worldWidth = this.worldCanvas.image.width; // Assuming worldCanvas.image.width gives the total width of the world
        const maxCameraX = worldWidth - this.worldCanvas.canvas.width;
        if (this.cameraX > maxCameraX) {
            this.cameraX = maxCameraX;
        }
    
        // Optional: Prevent the camera from going too far left (just in case)
        if (this.cameraX < 0) {
            this.cameraX = 0;
        }
    }
    
    
    clearCanvas() {
        const context = this.worldCanvas.context;
        context.clearRect(0, 0, this.worldCanvas.canvas.width, this.worldCanvas.canvas.height);
    }

    render() {
        const context = this.worldCanvas.context;
    
        context.save();
        context.translate(-this.cameraX, 0); // Move the entire world based on the camera position
    
        // Redraw the world canvas
        this.worldCanvas.draw();
    
        // Draw Mario after drawing the ground objects
        if (this.mario) {
            this.mario.renderToCanvas(this.mario.x, this.mario.y, this.mario.width, this.mario.height);
        }
    
        // Draw the ground objects
        for (const ground of this.groundObjects) {
            ground.draw();
        }
    
        context.restore(); // Reset the transformation to avoid affecting subsequent drawings
    }
    
    
}

// End GameEngine.js
