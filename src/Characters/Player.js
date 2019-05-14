import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y) {
		super(scene, x, y, 'ghost', 0);
		this.scene = scene;
		this.health = 5;
		this.invulnerable = false;
        this.direction = 'up';
        this.setAnimations();
        this.tint = 0xff0000;

		// enable physics
        this.scene.physics.world.enable(this);
        
        //this.body.setSize(10, 10);
        //this.body.setOffset(3, 10);
		// add our player to the scene
        this.scene.add.existing(this);
	}

    setAnimations() {
        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

    }

	update(cursors) {
		// check if the up or down key is pressed
		if (cursors.up.isDown) {
			this.setVelocityY(-150);
            this.direction = 'up';
            this.anims.play("up", true);
		} else if (cursors.down.isDown) {
			this.setVelocityY(150);
            this.direction = 'down';
            this.anims.play("down", true);
		} else {
			this.setVelocityY(0);
		}

		// check if the up or down key is pressed
		if (cursors.left.isDown) {
			this.setVelocityX(-150);
            this.direction = 'left';
            this.anims.play("left", true);
		} else if (cursors.right.isDown) {
			this.setVelocityX(150);
            this.direction = 'right';
            this.anims.play("right", true);
		} else {
			this.setVelocityX(0);
		}
	}

	loseHealth () {
		this.health--;
		this.scene.events.emit('loseHealth', this.health);
		if (this.health === 0) {
			this.scene.loadNextLevel(true);
		}
		this.invulnerable = true;
	}

	enemyCollision() {
		if(!this.invulnerable) {
			this.loseHealth();
			this.tint = 0xff0000;
			this.scene.time.addEvent({
				delay: 1200,
				callback: () => {
					this.invulnerable = false;
					this.tint = 0xffffff;
				},
				callbackScope: this
			});
		}
	}
}