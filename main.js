// main.js
// Begin main.js

import ImageLoader from './ImageLoader.js';

// Load images with promises
Promise.all([
    ImageLoader.loadImage('world1-1.png'),  // Background image
    ImageLoader.loadImage('mario.png')      // Mario image
])
.then(([worldImage, marioImage]) => {
    // Log after images are loaded
    console.log('Images loaded successfully:', worldImage, marioImage);
    // You can now use worldImage and marioImage
})
.catch((error) => {
    console.error('Error loading images:', error);
});

// End main.js
