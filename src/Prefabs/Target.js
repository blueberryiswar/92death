import Phaser from 'phaser';

export default class Target extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y) {
        super(scene, x, y, 'player', 1);

		this.scene = scene;
        this.live = 5;
        this.portalOpen = false;

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
    
    takeDamage(amount) {
        //console.log(amount);
        this.live -= amount;
        //console.log(this.live);
        if (this.live <= 0) {
            console.log(this.scene.cameras.main);
            this.scene.cameras.main.stopFollow();
            this.scene.cameras.main.pan(this.x, this.y, 1000, 'Elastic');
            this.portalOpen = true;
        }
    }
}