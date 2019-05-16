import Phaser from 'phaser';

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y, lifetime, key) {
		super(scene, x, y, key, 0);
		this.scene = scene;
        this.defaultLifetime = lifetime;
        this.speed = 60;

        // enable physics
        this.scene.physics.world.enable(this);

		// add our player to the scene
        this.scene.add.existing(this);
    }
    
    update(time, delta) {
        if(!this.active) return;

        if(this.lifetime > 0 ) {
            this.lifetime -= 1 * delta;
        } else {
            this.deactivate();
        }
    }

    deactivate() {
        this.disableBody();
        this.active = false;
        this.visible = false;
        this.setVelocity(0);
    }

    fireAt(position, target) {
        this.enableBody(true);
        this.active = true;
        this.lifetime = this.defaultLifetime;
        this.visible = true;
        this.setPosition(position.x, position.y);
        this.anims.play('fireBomb');
        this.rotation = this.scene.physics
                .accelerateToObject(this, target, this.speed);
    }

}