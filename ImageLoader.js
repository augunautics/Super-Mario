// ImageLoader.js
// Begin ImageLoader.js

// import ImageLoader from "./ImageLoader.js";

export default class ImageLoader {
    constructor({}) {}

    static loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }
}

// End ImageLoader.js
