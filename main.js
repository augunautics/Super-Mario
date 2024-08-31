// main.js
// Begin main.js

import ImageLoader from './ImageLoader.js';
import GameConfig from './GameConfig.js';
import JsonLoader from './JsonLoader.js';
import GameEngine from './GameEngine.js';

// Load images and JSON data with promises
Promise.all([
    ImageLoader.loadImage('world1-1.png'),  // Background image
    ImageLoader.loadImage('mario.png'),     // Mario image
    JsonLoader.loadJSON('levelData.json')   // JSON file with ground objects
])
.then(([worldImage, marioImage, jsonData]) => {
    // Log after images and JSON data are loaded
    console.log('Images and JSON data loaded successfully:', worldImage, marioImage, jsonData);

    // Instantiate GameConfig and initialize it with images and JSON data
    const gameConfig = new GameConfig({ worldImage, marioImage, jsonData });
    gameConfig.init();

    // Instantiate GameEngine with groundObjects and worldCanvas
    const gameEngine = new GameEngine({ 
        groundObjects: gameConfig.groundObjects, 
        worldCanvas: gameConfig.worldCanvas 
    });

    // Draw the ground objects
    gameEngine.drawGround();
})
.catch((error) => {
    console.error('Error loading resources:', error);
});

// End main.js
