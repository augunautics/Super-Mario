// BackgroundCanvas.js
// Begin BackgroundCanvas.js

import Constants from './Constants.js';  // Importing Constants

//import BackgroundCanvas from './BackgroundCanvas.js';

export default class BackgroundCanvas {
    constructor({ canvasId, image }) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.aspectRatio = Constants.aspectRatio;
        this.spriteSize = this.aspectRatio * Constants.spriteSize;
        this.border = Constants.borderSize;
        this.image = image;
    }

    draw() {
        if (!this.context || !this.image) {
            console.error('Canvas context or image not found');
            return;
        }
        
        // Get the width and height from the image, adjusted by aspect ratio
        const width = this.image.width * this.aspectRatio + this.border * 2; // border on both sides
        const height = this.image.height * this.aspectRatio / 2 - this.border * 2;

        // Resize the canvas
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';            
        this.canvas.width = width;
        this.canvas.height = height;

        // Draw the background at (0, 0)
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// End BackgroundCanvas.js
