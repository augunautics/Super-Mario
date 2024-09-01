import Transparency from "./Transparency.js";

export default class Entity extends Transparency {
    constructor({ image, x, y, width, height, crop, worldCanvas, color }) {
        super({ image, sourceX: crop.x, sourceY: crop.y, worldCanvas, color });
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;  
        this.worldCanvas = worldCanvas;
        this.context = worldCanvas.context;

    }

    

   
}
