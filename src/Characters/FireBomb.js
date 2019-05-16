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

}