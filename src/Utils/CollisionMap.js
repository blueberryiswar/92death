
export default class CollisionMap {
    constructor(tileMap, collisionLayers) {
        this.collisionLayers = collisionLayers;
        this.collisionMap = this.generateCollisionMap(tileMap);
        this.x = tileMap.tileWidth;
        this.y = tileMap.tileHeight;
    }

    

    generateCollisionMap(tileMap) {
        for(let i = 0; i < tileMap.layers.length; i++) {
            let layer = tileMap.layers[i];
            
        }
    }
}