import Constants from "./Constants.js";
export default class Transparency {
    constructor({ image, sourceX, sourceY, worldCanvas, color }) {
        this.image = image;
        this.spriteSize = Constants.spriteSize;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.worldCanvas = worldCanvas;
        this.context = this.worldCanvas.context; // Assuming worldCanvas.context is the correct context
        this.color = color,
        this.transparentColor = this.getTransparentColor();
        this.debug = Constants.debug;
        this.lineWidth = 2;
    }

    getTransparentColor() {
        // Create an off-screen canvas to analyze the sprite
        const offScreenCanvas = document.createElement('canvas');
        const offScreenCtx = offScreenCanvas.getContext('2d');

        // Set the size of the off-screen canvas to the sprite size
        offScreenCanvas.width = this.spriteSize;
        offScreenCanvas.height = this.spriteSize;

        // Draw the sprite on the off-screen canvas
        offScreenCtx.drawImage(
            this.image,
            this.sourceX, this.sourceY,
            this.spriteSize, this.spriteSize,
            0, 0,
            this.spriteSize, this.spriteSize
        );

        // Get the first pixel's color (top-left corner)
        const imageData = offScreenCtx.getImageData(0, 0, 1, 1);
        const pixel = imageData.data;

        // Return the RGB value of the first pixel
        return { r: pixel[0], g: pixel[1], b: pixel[2] };
    }

    applyTransparency(imageData) {
        const pixels = imageData.data;

        // Replace the "transparent" color with actual transparency
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            // Skip drawing the pixel if it's the transparent color
            if (r === this.transparentColor.r && g === this.transparentColor.g && b === this.transparentColor.b) {
                pixels[i + 3] = 0; // Set the alpha to 0 (fully transparent)
            }
        }

        return imageData;
    }

    renderToCanvas(destX, destY, destWidth, destHeight) {
        // Clear the previous position of Mario if necessary
        // Optionally: this.context.clearRect(previousX, previousY, destWidth, destHeight);
    
        const offScreenCanvas = document.createElement('canvas');
        const offScreenCtx = offScreenCanvas.getContext('2d');
    
        offScreenCanvas.width = this.spriteSize;
        offScreenCanvas.height = this.spriteSize;
    
        // Draw Mario's sprite on the off-screen canvas
        offScreenCtx.drawImage(
            this.image,
            this.sourceX, this.sourceY,
            this.spriteSize, this.spriteSize,
            0, 0,
            this.spriteSize, this.spriteSize
        );
    
        // Get the image data
        let imageData = offScreenCtx.getImageData(0, 0, this.spriteSize, this.spriteSize);
    
        // Apply transparency to the image data
        imageData = this.applyTransparency(imageData);
    
        // Put the modified image data back to the off-screen canvas
        offScreenCtx.putImageData(imageData, 0, 0);
    
        // Draw the modified image data onto the main canvas
        this.context.drawImage(
            offScreenCanvas,
            0, 0,
            this.spriteSize, this.spriteSize,
            destX, destY,
            destWidth, destHeight
        );
    
        // Draw the border around the image
        if (this.debug) {
            this.context.strokeStyle = this.color;
            this.context.lineWidth = this.lineWidth;
            this.context.strokeRect(destX, destY, destWidth, destHeight);
        }
    }
    }
