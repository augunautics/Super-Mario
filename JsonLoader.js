// JsonLoader.js
// Begin JsonLoader.js

//import JsonLoader from './JsonLoader.js';

import Ground from './Ground.js';

export default class JsonLoader {
    constructor({ }) { }

    static async loadJSON(url) {
        const response = await fetch(url);
        return response.json();
    }

    static loadGroundObjectsFromJSON({jsonData,context}) {
        const groundObjects = [];
        this.context = context;

        const layers = jsonData.layers || [];
        layers.forEach(layer => {
            if (layer.name === "ground") {
                const objects = layer.objects || [];
                objects.forEach(obj => {
                    groundObjects.push(new Ground({
                        x: obj.x,
                        y: obj.y,
                        width: obj.width,
                        height: obj.height,
                        context: this.context
                    }));
                });
            }
        });

        return groundObjects;
    }

}

// End JsonLoader.js
