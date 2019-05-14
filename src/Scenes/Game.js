import Phaser from "phaser";
import Player from "../Characters/Player";
import Enemies from "../Groups/Enemies";


export default class GameScene extends Phaser.Scene {
	constructor(key) {
		super(key);
		
	}

	init() {
		this.layers = {};
		this.enemyPointer = 0;
	}

	create() {
		this.createMap();
		this.cursors = this.input.keyboard.createCursorKeys();
		this.createPlayer();
		this.setUpCamera();
		this.enemies = new Enemies(this.physics.world, this, [{
			x: 150,
			y: 30
		},
		{
			x: 30,
			y: 250
		}]);
		console.log(this.enemies);
		this.physics.add.collider([this.player], 
			[this.layers.blocked]);

	}

	update() {
		this.player.update(this.cursors);
		if (this.enemyPointer < this.enemies.children.entries.length) {
			this.enemies.children.entries[this.enemyPointer].update();
			this.enemyPointer++;
		} else {
			this.enemyPointer = 0;
		}
		
	}

	createPlayer() {
		this.map.findObject('Characters', (obj) => {
			if(obj.type === 'playerStart') {
				this.player = new Player(this, obj.x, obj.y);
			}
		})
	}

	setUpCamera() {
		this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
		this.cameras.main.setDeadzone(20,20);
		this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.setZoom(4);
	}

	createMap() {
		//this.map = this.make.tilemap({key: "play"});
		//this.tiles = this.map.addTilesetImage('greenerror');
		this.map = this.make.tilemap({key: "greenZone"});
		this.tiles = this.map.addTilesetImage('greenZone', 'greenZone', 16, 16, 1, 2);
		console.log(this.map);
		this.layers.background = {};
		this.layers.background.first = this.map.createStaticLayer("Background1", this.tiles, 0, 0);
		this.layers.background.second = this.map.createStaticLayer("Background2", this.tiles, 0, 0);
		this.layers.background.third = this.map.createStaticLayer("Background3", this.tiles, 0, 0);
		this.layers.blocked = this.map.createStaticLayer("Blocked1", this.tiles, 0,0);
		this.layers.blocked.setCollisionByExclusion([-1]);
	}
}
