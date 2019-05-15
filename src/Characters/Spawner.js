import Phaser from 'phaser';

export default class Spawner extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y, properties) {
		super(scene, x, y, 'ghost', 0);
		this.scene = scene;
        this.delay = 1500;
        this.live = 10;
        this.enemy = 'irrlicht';
		// add our player to the scene
        this.scene.add.existing(this);
        //this.checkPath();

        for(let i=0; i<properties.length; i++) {
            let property = properties[i];

            switch(property.name) {
                case "delay":
                    this.delay = property.value;
                    break;
                case "enemy":
                    this.enemy = property.value;
                    break;
                case "live":
                    this.live = property.value;
                    break;
                default:
                    console.error("unknown property: " + property.name);
            }
        }

        this.startingLive = this.live;

        this.scene.time.addEvent({
            delay: this.delay,
            callbackScope: this,
            callback: this.spawnEnemy,
            loop: true
        });
    }

    checkPath() {
        
        this.points = [];
        for(let i = 0; i < 20; i++) {
            let objects = this.scene.physics.overlapRect(this.x, this.y - 32 * i, 32, 32);
            this.points.push({
                x: this.x,
                y: this.y - 32 * i, 
                objects: objects
            });
        }
        
        console.log(this.points);
    }
    
    spawnEnemy() {
        if(this.scene.enemies.children.entries.length < 500 && this.live > 0) {
            console.log(this.enemy);
            switch(this.enemy) {
                case "Ghost":
                case "ghost":
                    this.scene.enemies.createEnemies([{type: 'ghost', x: this.x, y: this.y}]);
                    this.live--;
                    break;
                case "Irrlicht":
                case "irrlicht":
                    console.log("irrlicht go");
                    this.scene.enemies.createEnemies([{type: 'irrlicht', x: this.x, y: this.y}]);
                    this.live--;
                    break;
                default:
                    break;
            }
        }

    }

    
     
}