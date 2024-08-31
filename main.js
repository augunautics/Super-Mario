// main.js
// Begin main.js

import ImageLoader from './ImageLoader.js';
import GameConfig from './GameConfig.js';

// Disable scrollbars by setting overflow to hidden
//document.body.style.overflow = 'hidden';

// Load images with promises
Promise.all([
    ImageLoader.loadImage('world1-1.png'),  // Background image
    ImageLoader.loadImage('mario.png')      // Mario image
])
.then(([worldImage, marioImage]) => {
    // Log after images are loaded
    console.log('Images loaded successfully:', worldImage, marioImage);
    
    // Instantiate GameConfig and initialize it with images
    const gameConfig = new GameConfig({ worldImage, marioImage });
    gameConfig.init();

    // You can now use worldImage and marioImage for further operations
})
.catch((error) => {
    console.error('Error loading images:', error);
});

// End main.js
