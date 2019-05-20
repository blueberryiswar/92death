import Enemy from './Enemy';

export default class Irrlicht extends Enemy {
	constructor (scene, x, y, path) {
		super(scene, x, y, 'irrlicht', path, 0);
        this.health = 3;
        this.damage = 1;
        this.setAnimations();
        this.moveSpeed = 12;
        this.exploding = false;
        this.targetPadding = {
            x: Phaser.Math.Between(-15, 15),
            y: Phaser.Math.Between(-15, 15)
        };

        this.body.setSize(12,12);
        this.body.setOffset(4,8);
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
            frameRate: 8,
            repeat: 0
        });
        this.anims.play("irrlichtMove", true);
    }

	myLoop() {
        
	}


	dying() {
        this.explode();
    }

    skill(target) {
        this.explode();
        target.takeDamage(this.damage, this);
    }

    explode() {
        if(this.exploding) return;
        this.explpding = true;
        this.anims.play('irrlichtExplode', true);
        this.scene.enemyDeath();
        this.scene.time.addEvent({
            delay: 1050,
            callbackScope: this,
            callback: this.destroy,
            loop: false
        });
    }
}