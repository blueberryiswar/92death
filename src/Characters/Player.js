import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y) {
		super(scene, x, y, 'player', 0);
		this.scene = scene;
		this.health = 5;
        this.invulnerable = false;
        this.moveSpeed = 70;
        this.direction = 'up';
        this.diagonal = false;
        this.setAnimations();
        this.stunned = true;
        //this.tint = 0xff0000;

		// enable physics
        this.scene.physics.world.enable(this);
        
        //this.body.setSize(10, 10);
        //this.body.setOffset(3, 10);
		// add our player to the scene
        this.scene.add.existing(this);
        this.scene.time.addEvent({
            delay: 250,
            callbackScope: this,
            callback: this.appear,
            loop: false
        });
	}

    setAnimations() {
        this.scene.anims.create({
            key: 'appear',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 12 }),
            frameRate: 8,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 12, end: 13 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'sideway',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 13, end: 18 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 19, end: 22 }),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 23, end: 23 }),
            frameRate: 5,
            repeat: -1
        });

    }

	update(cursors) {
        this.buttonpressed = false;
        if (this.stunned) return;
		// check if the up or down key is pressed
		if (cursors.up.isDown) {
			this.setVelocityY(this.moveSpeed * -1);
            this.direction = 'up';
            this.anims.play("up", true);
            this.diagonal = true;
            this.buttonpressed = true;
		} else if (cursors.down.isDown) {
			this.setVelocityY(this.moveSpeed);
            this.direction = 'down';
            this.anims.play("down", true);
            this.diagonal = true;
            this.buttonpressed = true;
		} else {
            this.setVelocityY(0);
            this.diagonal = false;
		}

		// check if the up or down key is pressed
		if (cursors.left.isDown) {
			this.setVelocityX(this.moveSpeed * -1);
            this.direction = 'left';
            if (!this.diagonal) {
            this.anims.play("sideway", true);
            this.buttonpressed = true;
            this.setFlipX(true);
            }
		} else if (cursors.right.isDown) {
			this.setVelocityX(this.moveSpeed);
            this.direction = 'right';
            if (!this.diagonal) {
            this.anims.play("sideway", true);
            this.setFlipX(false);}
            this.buttonpressed = true;
		} else {
			this.setVelocityX(0);
        }
        if (this.buttonpressed) {
            //this.anims.play('idle', true);
            this.buttonpressed = false;
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
    
    appear() {
        this.anims.play('appear', true);
        this.stunned = false;
    }
}