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
        if (!this.context) {
            console.error('Canvas context not found');
            return;
        }

        // Crop the image to half its height minus spriteSize pixels
        this.croppedHeight = this.image.height / 2 - this.spriteSize;
        this.croppedWidth = this.image.width;

        // Scale the cropped height and the original width to fill the world canvas
        this.scaledHeight = this.croppedHeight * this.aspectRatio;
        this.scaledWidth = this.croppedWidth * this.aspectRatio;

        this.canvas.style.position = 'absolute';
        this.canvas.width = this.scaledWidth;
        this.canvas.height = this.scaledHeight;

        this.context.drawImage(
            this.image,                    // Source image
            0, 0,                          // Source x, y (start from the top-left of the image)
            this.croppedWidth, this.croppedHeight, // Source width, height (full width, cropped height)
            this.borderSize, this.borderSize,       // Destination x, y (start at the top-left of the canvas)
            this.scaledWidth, this.scaledHeight     // Destination width, height (scaled width and height)
        );
    }
}

// End WorldCanvas.js
