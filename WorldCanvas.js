// WorldCanvas.js
// Begin WorldCanvas.js

import Constants from './Constants.js';  // Importing Constants

export default class WorldCanvas {
    constructor({ canvasId, image }) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.aspectRatio = Constants.aspectRatio;
        this.borderSize = Constants.borderSize;
        this.spriteSize = Constants.spriteSize;
        this.image = image;
    }

    draw() {
        if (!this.context || !this.image) {
            console.error('Canvas context or image not found');
            return;
        }

        Object.assign(this.canvas.style, {
            position: 'absolute',
            top: '0',
            left: '0',
        });
    
        // Calculate the canvas dimensions, including the border
        const canvasWidth = this.image.width * this.aspectRatio + this.borderSize * 2;
        const canvasHeight = this.image.height * this.aspectRatio / 2 + this.borderSize * 2 - this.spriteSize*this.aspectRatio ;
    
        // Resize and position the canvas
       
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
    
        // Draw the black background covering the entire canvas
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, canvasWidth, canvasHeight);
    
        // Calculate the cropped and scaled dimensions of the image
        const croppedHeight = this.image.height / 2 - this.spriteSize;
        const croppedWidth = this.image.width;
        const scaledHeight = croppedHeight * this.aspectRatio;
        const scaledWidth = croppedWidth * this.aspectRatio;
    
        // Draw the image with the border offset
        this.context.drawImage(
            this.image,                     // Source image
            0, 0,                           // Source x, y (start from the top-left of the image)
            croppedWidth, croppedHeight,    // Source width, height (full width, cropped height)
            this.borderSize, this.borderSize, // Destination x, y (start at the top-left of the canvas)
            scaledWidth, scaledHeight       // Destination width, height (scaled width and height)
        );
    }
    
    
}

// End WorldCanvas.js
