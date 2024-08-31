// BackgroundCanvas.js
// Begin BackgroundCanvas.js

import Constants from './Constants.js';  // Importing Constants

export default class BackgroundCanvas {
    constructor({canvasId}) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.aspectRatio = Constants.aspectRatio;
        this.spriteSize = Constants.spriteSize;
        this.aspect = this.aspectRatio*this.spriteSize;
        this.border = Constants.borderSize;

        // Position the background canvas
        this.positionCanvas();
    }

    positionCanvas() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
    }

    drawBackground(image) {
        if (this.context) {
            // Get the width and height from the image, adjusted by aspect ratio
            const width = image.width * this.aspectRatio * 2 + this.border* this.aspectRatio;
            const height = image.height * this.aspectRatio ;
    
            // Resize the canvas
            this.canvas.width = width;
            this.canvas.height = height - (this.spriteSize *this.aspectRatio);
    
            // Draw the background at (0, 0)
            this.context.fillStyle = 'black';
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            console.error('Canvas context not found');
        }
    }
}

// End BackgroundCanvas.js
