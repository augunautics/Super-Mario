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
    }

    draw(context) {
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.lineWidth;

        const x = this.x * this.aspectRatio + this.border;
        const y = this.y * this.aspectRatio + this.height;
        const width = this.width * this.aspectRatio;
        const height = this.height * this.aspectRatio;

        context.strokeRect(x, y, width, height);
    }
}

// End Ground.js
