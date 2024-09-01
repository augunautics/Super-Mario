// Ground.js
// Begin Ground.js

import Constants from './Constants.js';

export default class Ground {
    constructor({ x, y, width, height }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Default styling for the ground object
        this.strokeStyle = 'red';
        this.lineWidth = 2;

        // Aspect ratio and border are derived from Constants
        this.aspectRatio = Constants.aspectRatio;
        this.border = Constants.borderSize;
        this.x = this.x * this.aspectRatio + this.border;
        this.y = this.y * this.aspectRatio + this.height;
        
        this.width = this.width * this.aspectRatio;
        this.height = this.height * this.aspectRatio;
    }

    draw(context) {
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.lineWidth;
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

// End Ground.js
