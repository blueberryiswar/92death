import Phaser from 'phaser';
import Ghost from '../Characters/Ghost';
import Irrlicht from '../Characters/Irrlicht';

export default class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, spriteArray) {
        super(world, scene);
        this.scene = scene;

        this.createEnemies(spriteArray);
    }

    createEnemies(spriteArray) {
        // add spriteArray enemies to our Group
    
        spriteArray.forEach(sprite => {
            const enemy = this.getNewEnemy(sprite.type, sprite.x, sprite.y, sprite.path);
            // add to our group
            this.add(enemy);
            // destroy the sprite
            //sprite.destroy();
        });
    }

    getNewEnemy(type, x, y, path) {
        let enemy = undefined;
        switch(type) {
            case "ghost":
            enemy = new Ghost(this.scene, x, y, path);
            break;
            case "irrlicht":
            enemy = new Irrlicht(this.scene, x, y, path);
            break;
            default:
            console.log("Couldn't find type: " + type);
        }
        return enemy;
    }

}