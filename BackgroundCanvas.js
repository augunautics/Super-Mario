// BackgroundCanvas.js
// Begin BackgroundCanvas.js

// import BackgroundCanvas from "./BackgroundCanvas.js";

export default class BackgroundCanvas {
    constructor({canvasId}) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
    }

    drawBackground() {
        if (this.context) {
            // Fill the canvas with black
            this.context.fillStyle = 'black';
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            console.error('Canvas context not found');
        }
    }
}

// End BackgroundCanvas.js
