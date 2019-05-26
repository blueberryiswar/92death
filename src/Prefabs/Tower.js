import Phaser from 'phaser';

export default class Tower extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y, key) {
        super(scene, x, y, key, 0);

        this.scene = scene;
        this.damage = 5;
        this.rangeX = 200;
        this.rangeY = 200;
        this.reloading = false;
        this.reloadTime = 3000;
        this.reloadCurrent = 2000;
        this.health = 50;

        this.bullets = { 
            children: {
                entries: []
            }
        };

        // enable physics
        this.scene.physics.world.enable(this);
        this.reduceVelocity = 2;
		// add our player to the scene
        this.scene.add.existing(this);
        this.setImmovable(true);

        this.startingHealth = this.health;
    }

    reloadTower() {
        this.reloading = true;
        this.reloadCurrent = this.reloadTime;
    }

    takeDamage() {
        console.log("Tower takes damage");
    }

    doDamage() {
        console.log("not an enemy");
    }

    action(delta) {
        console.log("No action set for tower when not reloading");
    }

    update(time, delta) {
        if (this.reloadCurrent > 0) {
            this.reloadCurrent -= 1 * delta;
        } else {
            this.action();
        }

        this.bullets.children.entries.forEach((bullet) => {
            bullet.update(time, delta);
        });

        this.depth = this.y + this.height / 2;
    }
}