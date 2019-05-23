import Bullets from '../../Groups/Bullets';
import Tower from '../Tower';
import TargetArea from '../Skills/targetArea';

export default class FireTower extends Tower {
	constructor (scene, x, y) {
        super(scene, x, y, 'fireTower', 0);

        this.bullets = new Bullets(this.scene.physics.world, this.scene, 'fireBomb', {x: this.x, y: this.y - 26}, 8);
        this.setAnimations();
        this.targetArea = new TargetArea(this.scene, this.x, this.y + 40, 100, this);
        this.targetArea.deactivate();


        this.setSize(36, 24);
        this.setOffset(14, 40);
        this.reduceVelocity = 2;

        this.setImmovable(true);
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
        this.on('animationcomplete', this.fireBullet, this);
        this.myTarget = target;
        //target.takeDamage(this.damage);
    }

    fireBullet() {
        if(this.reloadCurrent > 0) return;
        this.bullets.fireBullet({x: this.x, y: this.y - 26}, this.myTarget);
        this.reloadTower();
        //this.scene.physics.pause();
    }

    reloadTower() {
        this.reloading = true;
        this.reloadCurrent = this.reloadTime;
    }

    takeDamage() {
        console.log("Tower takes damage");
    }

    doDamage() {
        console.log("not an enemy");
    }

    action() {
        this.findNextTarget();
    }

}