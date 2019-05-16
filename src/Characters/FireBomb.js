import Bullet from './Bullet';

export default class FireBomb extends Bullet {
	constructor (scene, x, y) {
		super(scene, x, y, 5000, 'fireBomb');
        this.setAnimations();
        this.speed = 80;
    }
    
    setAnimations() {
        this.scene.anims.create({
            key: 'fireBomb',
            frames: this.scene.anims.generateFrameNumbers('fireBomb', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: 0
        });
        this.anims.play('fireBomb');
    }

    fireAt(position,target) {
        this.enableBody(true);
        this.active = true;
        this.lifetime = this.defaultLifetime;
        this.visible = true;
        this.setPosition(position.x, position.y);
        this.rotation = this.scene.physics
                .accelerateToObject(this, target, this.speed);
        this.anims.play('fireBomb');
        this.scene.add.sprite({
            key: 'aoe',
            x: target.x,
            y: target.y
        }, true);
    }

}