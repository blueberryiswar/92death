import Phaser from 'phaser';
import Ghost from '../Characters/Ghost';

export default class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, spriteArray) {
        super(world, scene);
        this.scene = scene;

        this.createEnemies(spriteArray);
    }

    createEnemies(spriteArray) {
        // add spriteArray enemies to our Group
        spriteArray.forEach(sprite => {
            // create a new enemy
            const enemy = new Ghost(this.scene, sprite.x, sprite.y);
            // add to our group
            this.add(enemy);
            // destroy the sprite
            //sprite.destroy();
        });
    }

}