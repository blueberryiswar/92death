import Phaser from 'phaser';
import FireBomb from '../Prefabs/FireBomb';

export default class Bullets extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, type, position, amount) {
        super(world, scene);
        this.scene = scene;
        this.type = type;
        this.damage = 5;
        this.position = position;
        console.log(this.scene);

        let key = undefined;
        let count = 5;

        switch(type) {
            case 'fireBomb':
                key = 'fireBomb';
           
                this.damage = 5;
                break;
            default:
                console.warn("Unknown bullet type: " + type);
                return;
        }
        for(let i=0; i < amount; i++) {
            let bullet = undefined;
            switch(type) {
                case 'fireBomb':
                    bullet = new FireBomb(this.scene, this.position.x, this.position.y);
                    break;
                default:
                    return; 
            }
            if (bullet) {
                bullet.deactivate();
                this.add(bullet);
            }
        }


        this.scene.physics.add.overlap(this, this.scene.enemies, (bullet, enemy) => {
            this.enemyCollision(bullet, enemy)
            
        });
    }

    enemyCollision(bullet, enemy) {
        this.deactivateBullet(bullet);
        enemy.takeDamage(this, this.damage);
    }

    getFirstFree() {
        console.log(this.children.entries);
        for(let i=0; i < this.children.entries.length; i++) {
            const bullet = this.children.entries[i];

            if(!bullet.active) return bullet;
        }
    }

    fireBullet(source, target) {
        const bullet = this.getFirstFree(false);
        console.log(bullet);
        if (bullet) {
            bullet.fireAt(source, target);
        }
    }

    deactivateBullet(bullet) {
        bullet.deactivate();
    }
}