import Phaser from 'phaser';

export default class Spawner extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y, properties) {
		super(scene, x, y, 'spawner', 0);
		this.scene = scene;
        this.delay = 1500;
        this.live = 10;
        this.enemy = 'irrlicht';
        this.increment = 5;
		// add our player to the scene
        this.scene.add.existing(this);
        //this.checkPath();
        this.nearestPath = undefined;

        // also defines maximum distance
        let shortestRoute = 100;
        for (let i = 0; i< this.scene.paths.objects.length; i++) {
            const path = this.scene.paths.objects[i];
            console.log(path.x + ' ' + path.y);
            const distance = Math.abs(path.x - this.x) + Math.abs(path.y - this.y);
            console.log('distance: ' + distance + ' // current shortest: ' + shortestRoute);
            if(distance < shortestRoute) {
                shortestRoute = distance;
                console.log("updated");
                this.nearestPath = path;
            }
        }

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
            switch(this.enemy) {
                case "Ghost":
                case "ghost":
                    this.scene.enemies.createEnemies([{type: 'ghost', x: this.x, y: this.y, path: this.nearestPath}]);
                    this.live--;
                    break;
                case "Irrlicht":
                case "irrlicht":
                    
                    this.scene.enemies.createEnemies([{type: 'irrlicht', x: this.x, y: this.y}]);
                    this.live--;
                    break;
                default:
                    break;
            }
        }

    }

    
     
}