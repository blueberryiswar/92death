import Phaser from 'phaser';
import Bullets from '../Groups/Bullets';

export default class FireTower extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y) {
        super(scene, x, y, 'fireTower', 0);

		this.scene = scene;
        this.damage = 5;
        this.rangeX = 200;
        this.rangeY = 200;
        this.reloading = false;
        this.reloadTime = 2400;
        this.reloadCurrent = 2000;
        this.bullets = new Bullets(this.scene.physics.world, this.scene, 'fireBomb', {x: this.x, y: this.y - 26});
        console.log(this.scene);
        this.setAnimations();

        // enable physics
        this.scene.physics.world.enable(this);

		// add our player to the scene
        this.scene.add.existing(this);

        /*for(let i=0; i<properties.length; i++) {
            let property = properties[i];

            switch(property.name) {
                case "live":
                    this.live = property.value;
                    break;
                default:
                    console.error("unknown property: " + property.name);
            }
        }*/

        this.startingLive = this.live;
    }

    setAnimations() {
        this.scene.anims.create({
            key: 'fireTowerGrow',
            frames: this.scene.anims.generateFrameNumbers('fireTower', { start: 0, end: 11 }),
            frameRate: 6,
            repeat: 0
        });
        
        this.scene.anims.create({
            key: 'fireTowerShoot',
            frames: this.scene.anims.generateFrameNumbers('fireTower', { start: 12, end: 17 }),
            frameRate: 6,
            repeat: 0
        });
        this.anims.play('fireTowerGrow', true);
    }
    
    findNextTarget() {
        let objects = this.scene.physics.overlapRect(this.x - this.rangeX /2, this.y - this.rangeY / 2, this.rangeX, this.rangeY);
        for(let i = 0; i < objects.length; i++) {
            if (objects[i].gameObject.towerTarget) {
            this.fireAt(objects[i].gameObject);
            return;
            }
        }
    }
    //&& objects[i].gameObject.hasOwnProperty('takeDamage')

    fireAt(target) {
        if(this.reloadCurrent > 0) return;
        this.anims.play('fireTowerShoot', true);
        this.myTarget = target;
        //target.takeDamage(this.damage);
        
        this.reloadTower();
        this.scene.time.addEvent({
            delay: 900,
            callbackScope: this,
            callback: this.fireBullet,
            loop: false
        });
    }

    fireBullet() {
        this.bullets.fireBullet(this.myTarget.x, this.myTarget.y);
        //this.scene.physics.pause();
    }

    reloadTower() {
        this.reloading = true;
        this.reloadCurrent = this.reloadTime;
    }

    update(time, delta) {
        if (this.reloadCurrent > 0) {
            this.reloadCurrent -= 1 * delta;
        } else {
            this.findNextTarget();
        }
    }
}