import Phaser from 'phaser';

export default class FireTower extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y) {
        super(scene, x, y, 'player', 1);

		this.scene = scene;
        this.damage = 5;
        this.rangeX = 200;
        this.rangeY = 200;
        this.reloading = false;
        this.reloadTime = 1000;
        this.reloadCurrent = 0;
        console.log("alive");

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
        console.log(target);
        target.takeDamage(this.damage);
        this.reloadTower();
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