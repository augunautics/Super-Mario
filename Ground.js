// Ground.js
// Begin Ground.js

import Constants from './Constants.js';

export default class Ground {
    constructor({ x, y, width, height, context }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.context = context;

        // Default styling for the ground object
        this.strokeStyle = 'red';
        this.lineWidth = 2;
        this.debug = Constants.debug;


        // Aspect ratio and border are derived from Constants
        this.aspectRatio = Constants.aspectRatio;
        this.border = Constants.borderSize;
        this.x = this.x * this.aspectRatio + this.border;
        this.y = this.y * this.aspectRatio + this.height;

        this.width = this.width * this.aspectRatio;
        this.height = this.height * this.aspectRatio;
    }

    draw() {
        if (this.debug) {
            this.context.strokeStyle = this.strokeStyle;
            this.context.lineWidth = this.lineWidth;
            this.context.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

// End Ground.js
