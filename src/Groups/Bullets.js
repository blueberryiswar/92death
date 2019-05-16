import Phaser from 'phaser';

export default class Bullets extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, type, position) {
        super(world, scene);
        this.scene = scene;
        this.type = type;
        this.damage = 1;
        this.position = position;
        console.log(this.scene);

        let key = undefined;
        let count = 5;

        switch(type) {
            case 'fireBomb':
                key = 'fireBomb';
                count = 4;
                this.damage = 5;
                break;
            default:
                console.warn("Unknown bullet type: " + type);
                return;
        }

        this.createMultiple({
            frameQuantity: count,
            key: key,
            active: false,
            visible: false
        });

        this.setAnimations();
        this.scene.physics.add.overlap(this, this.scene.enemies, (bullet, enemy) => {
            this.enemyCollision(bullet, enemy)
        });
    }

    setAnimations() {
        switch(this.type) {
            case 'fireBomb':
            this.animationKey = 'fireBombFlight';
            this.scene.anims.create({
                key: this.animationKey,
                frames: this.scene.anims.generateFrameNumbers('fireBomb', { start: 0, end: 3 }),
                frameRate: 6,
                repeat: 0
            });
            break;
            default:
            break;
        }
    }

    enemyCollision(bullet, enemy) {
        this.deactivateBullet(bullet);
        enemy.takeDamage(this.damage);
    }

    fireBullet(x, y) {
        const bullet = this.getFirstDead(false);
        if (bullet) {
            bullet.enableBody(true);
            bullet.active = true;
            bullet.visible = true;
            bullet.setPosition(this.position.x, this.position.y);
            bullet.anims.play(this.animationKey, true);
            bullet.rotation = this.scene.physics
                .accelerateTo(bullet, x, y, 80);
        }
    }

    deactivateBullet(bullet) {
        bullet.disableBody();
        bullet.active = false;
        bullet.visible = false;
        bullet.setVelocity(0);
    }
}