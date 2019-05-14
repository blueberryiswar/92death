import Phaser from 'phaser';
import Ghost from '../Characters/Ghost';

export default class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, spriteArray) {
        super(world, scene);
        this.scene = scene;

        this.createEnemies(scene, spriteArray);
    }

    createEnemies(scene, spriteArray) {
        // add spriteArray enemies to our Group
        spriteArray.forEach(sprite => {
            // create a new enemy
            const enemy = new Ghost(scene, sprite.x, sprite.y);
            // add to our group
            this.add(enemy);
            // destroy the sprite
            //sprite.destroy();
        });
    }

}