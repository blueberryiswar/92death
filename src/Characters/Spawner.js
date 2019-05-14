import Phaser from 'phaser';

export default class Spawner extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y, delay, live, enemy) {
		super(scene, x, y, enemy, 0);
		this.scene = scene;
        this.delay = delay;
        this.live = live;
        this.enemy = enemy;
		// add our player to the scene
        this.scene.add.existing(this);

        this.scene.time.addEvent({
            delay: this.delay,
            callbackScope: this,
            callback: this.spawnEnemy,
            loop: true
        });
    }
    
    spawnEnemy() {
        if(this.scene.enemies.children.entries.length < 50) {
            switch(this.enemy) {
                case "ghost":
                    this.scene.enemies.createEnemies([{x: this.x, y: this.y}]);
                    break;
                default:
                    break;
            }
        }

    }

    
     
}