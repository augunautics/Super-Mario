// Mario.js
// Begin Mario.js

export default class Mario {
    constructor({ x, y, width, height, image, crop }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;  // Mario's image
        this.color = 'red';   // Mario's color for the border
        this.lineWidth = 2;   // Width of the border

        // Cropping parameters
        this.crop = crop;  // Optional crop parameter
    }

    draw(context) {
        if (!context || !this.image) {
            console.error('Canvas context or image not found for drawing Mario');
            return;
        }

        // Draw the cropped image if crop parameters are provided
        context.drawImage(
            this.image,                     // Source image
            this.crop.x, this.crop.y,       // Source x, y (top-left corner of the sprite)
            this.crop.width, this.crop.height, // Source width, height (crop size of the sprite)
            this.x, this.y,                 // Destination x, y (position on the canvas)
            this.width, this.height         // Destination width, height (size on the canvas)
        );

        // Draw the border around the image
        context.strokeStyle = this.color;
        context.lineWidth = this.lineWidth;
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

// End Mario.js
