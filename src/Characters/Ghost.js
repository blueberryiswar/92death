
import Enemy from './Enemy';

export default class Ghost extends Enemy {
    constructor(scene, x, y, path) {
        super(scene, x, y, 'ghost', path);
        this.scene = scene;
        
        this.setAnimations();
        
        this.tolerance = 10;

        this.moveSpeed = Phaser.Math.Between(15, 25);
        this.targetPadding = {
            x: Phaser.Math.Between(1, 8),
            y: Phaser.Math.Between(1, 8)
        };

        this.body.setSize(12, 12);
        this.body.setOffset(1, 1);
        this.setBounce(0.2);
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

}