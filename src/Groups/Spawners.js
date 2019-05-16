import Phaser from 'phaser';
import Spawner from '../Characters/Spawner';

export default class Spawners extends Phaser.Physics.Arcade.StaticGroup {
    constructor(world, scene, spriteArray) {
        super(world, scene);
        this.scene = scene;
        this.createSpawners(spriteArray);
    }

    createSpawners(spriteArray) {
        // add spriteArray enemies to our Group
        for(let i = 0; i < spriteArray.objects.length; i++) {
            let config = spriteArray.objects[i];
            const spawner = new Spawner(this.scene, config.x, config.y, config.properties);
            this.add(spawner);
        }
    }

}