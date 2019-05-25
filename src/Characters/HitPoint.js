import Phaser from 'phaser';

export default class HitPoint extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, hp) {
        super(scene, x, y, 'hitpoints', 0);
        this.scene = scene;
        this.hp = hp;

        this.setScale(3);

        this.setAnimations();
        this.playAnimation();
    }
 
    setAnimations() {
        this.scene.anims.create({
			key: 'hitpointsFull',
			frames: this.scene.anims.generateFrameNumbers('hitpoints', { start: 0, end: 2 }),
			frameRate: 4,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'hitpointsHalf',
			frames: this.scene.anims.generateFrameNumbers('hitpoints', { start: 3, end: 6 }),
			frameRate: 4,
			repeat: -1
		});
    }

    playAnimation() {
        if (this.hp > 1) {
            //this.anims.play('hitpointsFull', true);
            this.setFrame(0);
            this.hp = 2;
            console.log('full');
        } else if (this.hp > 0) {
            //this.anims.play('hitpointsHalf', true);
            this.setFrame(3);
            console.log('half');
        } else {
            this.setFrame(11);
            console.log('empty');
        }
    }
}