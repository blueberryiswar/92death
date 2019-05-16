import Phaser from 'phaser';

export default class Irrlicht extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y) {
		super(scene, x, y, 'irrlicht', 0);
		this.scene = scene;
        this.health = 3;
        this.damage = 1;
        this.setAnimations();
        this.z = 50;
        this.towerTarget = true;
        this.moveSpeed = 10;
        this.targetPadding = {
            x: Phaser.Math.Between(-15, 15),
            y: Phaser.Math.Between(-15, 15)
        };


        this.myTarget = this.scene.target;

		// enable physics
        this.scene.physics.world.enable(this);

        this.body.setSize(12,12);
        this.body.setOffset(4,2);
        
        //this.body.setSize(10, 10);
        //this.body.setOffset(3, 10);
		// add our player to the scene
        this.scene.add.existing(this);
	}

    setAnimations() {
        this.scene.anims.create({
            key: 'irrlichtMove',
            frames: this.scene.anims.generateFrameNumbers('irrlicht', { start: 0, end: 2 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'irrlichtExplode',
            frames: this.scene.anims.generateFrameNumbers('irrlicht', { start: 3, end: 8 }),
            frameRate: 5,
            repeat: 0
        });
        this.anims.play("irrlichtMove", true);
    }

	update() {
        this.setVelocity(0);

        if(this.health <= 0) return;

		// check if the up or down key is pressed
		if (this.myTarget.x < this.x + this.targetPadding.x) {
			this.setVelocityX(this.moveSpeed * -1);
            this.direction = '';
		} else if (this.myTarget.x > this.x + this.targetPadding.x) {
			this.setVelocityX(this.moveSpeed);
            this.direction = 'ghostRight';
            
		} else {
			this.setVelocityX(0);
        }
        
        // check if the up or down key is pressed
		if (this.myTarget.y < this.y + this.targetPadding.y) {
			this.setVelocityY(this.moveSpeed * -1);
            this.direction = 'up';
		} else if (this.myTarget.y > this.y + this.targetPadding.x) {
			this.setVelocityY(this.moveSpeed);
            this.direction = 'down';
		} else {
			this.setVelocityY(0);
        }
        this.z=this.y;
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
    
    doDamage(target) {
        if (this.health <= 0) return;
        this.takeDamage(this.health);
        target.takeDamage(this.damage);
    }

    enterGate() {
        this.destroy();
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.explode();
        }
    }

    explode() {
        this.anims.play('irrlichtExplode', true);
        this.scene.enemyDeath();
        this.scene.time.addEvent({
            delay: 1250,
            callbackScope: this,
            callback: this.destroy,
            loop: false
        });
    }
}