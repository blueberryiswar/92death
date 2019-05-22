import Phaser from 'phaser';
import Enemy from '../Enemy';

export default class Ghost extends Enemy {
    constructor(scene, x, y, path) {
        super(scene, x, y, 'ghost', path);
        this.scene = scene;
        
        this.setAnimations();
        this.weight = 1;
        
        this.tolerance = 10;

        this.moveSpeed = Phaser.Math.Between(20, 25);
        this.targetPadding = {
            x: Phaser.Math.Between(1, 8),
            y: Phaser.Math.Between(1, 8)
        };

        this.body.setSize(12, 12);
        this.body.setOffset(1, 8);
        this.setBounceX(1.5);
        this.setBounceY(1.6);
    }

    setAnimations() {
        this.scene.anims.create({
            key: 'ghostDown',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ghostRight',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ghostLeft',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 8, end: 11 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ghostUp',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 12, end: 15 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ghostDeath',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 12, end: 19 }),
            frameRate: 4,
            repeat: 0
        });

        this.attackAnimation = this.scene.tweens.add({
          targets: this,
          props: {
              scaleX: {
                value: 1.8,
                ease: 'Power1',
                duration: 150,
                yoyo: true
              },
              scaleY: {
                value: 1.3,
                ease: 'Quad.easeInOut',
                duration: 80,
                yoyo: true
              },
          }
        });
    }

    skill(target) {

        this.anims.stop();
        this.attackAnimation.restart();
        this.animationLock = 300;
        target.takeDamage(this.damage, this);
    }

    myLoop(delta) {
        
        switch(this.direction) {
            case 'up':
            this.anims.play("ghostUp", true);
            break;
            case 'down':
            this.anims.play("ghostDown", true);
            break;
            case 'left':
            this.anims.play("ghostLeft", true);
            break;
            case 'right':
            this.anims.play("ghostRight", true);
            break;
            default:
            break;
        }
    }

    dying() {
        this.anims.play("ghostDeath", true);
        this.on('animationcomplete', this.destroy, this);
    }

}