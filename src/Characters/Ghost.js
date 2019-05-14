import Phaser from 'phaser';

export default class Ghost extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y) {
		super(scene, x, y, 'ghost', 0);
		this.scene = scene;
		this.health = 5;
        this.setAnimations();

        this.moveSpeed = 120;
        this.targetPadding = {
            x: Phaser.Math.Between(-25, 25),
            y: Phaser.Math.Between(-25, 25)
        };


        this.myTarget = this.scene.player;

		// enable physics
        this.scene.physics.world.enable(this);
        
        this.body.setSize(10, 10);
        this.body.setOffset(3, 10);
		// add our player to the scene
        this.scene.add.existing(this);
	}

    setAnimations() {
        this.scene.anims.create({
            key: 'ghostDown',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ghostRight',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ghostLeft',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ghostUp',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

    }

	update() {

		// check if the up or down key is pressed
		if (this.myTarget.x < this.x + this.targetPadding.x) {
			this.setVelocityX(-120);
            this.direction = 'left';
            this.anims.play("left", true);
		} else if (this.myTarget.x > this.x + this.targetPadding.x) {
			this.setVelocityX(120);
            this.direction = 'right';
            this.anims.play("right", true);
		} else {
			this.setVelocityX(0);
        }
        
        // check if the up or down key is pressed
		if (this.myTarget.y < this.y + this.targetPadding.y) {
			this.setVelocityY(-120);
            this.direction = 'up';
            this.anims.play("up", true);
		} else if (this.myTarget.y > this.y + this.targetPadding.x) {
			this.setVelocityY(120);
            this.direction = 'down';
            this.anims.play("down", true);
		} else {
			this.setVelocityY(0);
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