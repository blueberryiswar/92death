import Phaser from 'phaser';

export default class Spawner extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y, properties) {
		super(scene, x, y, 'ghost', 0);
		this.scene = scene;
        this.delay = 1500;
        this.live = 10;
        this.enemy = 'ghost';
		// add our player to the scene
        this.scene.add.existing(this);

        for(let i=0; i<properties.length; i++) {
            let property = properties[i];

            switch(property.name) {
                case "delay":
                    this.delay = property.value;
                    break;
                case "enemy":
                    this.enemy = property.value;
                    break;
                case "live":
                    this.live = property.value;
                    break;
                default:
                    console.error("unknown property: " + property.name);
            }
        }

        this.scene.time.addEvent({
            delay: this.delay,
            callbackScope: this,
            callback: this.spawnEnemy,
            loop: true
        });
    }
    
    spawnEnemy() {
        if(this.scene.enemies.children.entries.length < 500 && this.live > 0) {
            switch(this.enemy) {
                case "ghost":
                    this.scene.enemies.createEnemies([{x: this.x, y: this.y}]);
                    this.live--;
                    break;
                default:
                    break;
            }
        }

    }

    
     
}