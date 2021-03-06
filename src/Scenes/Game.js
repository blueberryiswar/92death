import Phaser from "phaser";
import Player from "../Prefabs/Player";
import Enemies from "../Groups/Enemies";
import Spawners from "../Groups/Spawners";
import Target from "../Prefabs/Target";
import Towers from "../Groups/Towers";
import Controls from "../Utils/Controls";


export default class GameScene extends Phaser.Scene {
	constructor(key) {
		super(key);
	}

	init() {
		this.layers = {};
		this.enemyPointer = 0;
		this.wave = 1;
		this.waves = 5;
		this.toDefeat = 0;
		this.controls = {};
		this.debug = false;
	}

	create() {
		this.events.emit('newGame');
		this.createMap();
		this.controls = new Controls(this);
		this.cursors = this.input.keyboard.createCursorKeys();
		

		this.createPlayer();
		this.createTarget();
		this.setUpCamera();
		this.enemies = new Enemies(this.physics.world, this, []);
		//this.spawner = new Spawner(this, 125, 40, 500, 50, 'ghost');
		this.getPath();
		this.createSpawners();
		this.createTowerGroup();


		this.physics.add.collider([this.player, this.towerGroup, this.enemies],
			[this.layers.blocked.first, this.layers.blocked.second]);
		/*this.physics.add.overlap([this.enemies],
			[this.layers.blocked.first, this.layers.blocked.second], (obj1, obj2) => {
				console.log(obj1);
				console.log('second');
				console.log(obj2);
				obj1.takeDamage(500);

			}); */
		this.physics.add.collider(this.enemies, this.player, (player, enemy) => {
			enemy.doDamage(player);
		});
		this.physics.add.collider(this.enemies, this.enemies);

		this.physics.add.overlap(this.enemies, this.target, (target, enemy) => {
			if (!target.portalOpen) {
				enemy.doDamage(target);
			} else {
				enemy.enterGate();
				this.gameOver();
			}
		});

	}

	gameOver() {
		//this.physics.pause();
		this.scene.restart();
	}

	update(time, delta) {
		this.controls.update();
		this.player.update(delta);
		/*if (this.enemyPointer < this.enemies.children.entries.length) {
			this.enemies.children.entries[this.enemyPointer].update(delta);
			this.enemyPointer++;
		} else {
			this.enemyPointer = 0;
		} */
		this.enemies.children.entries.forEach(
			(enemy) => { enemy.update(delta); }
		)
		this.towerGroup.children.entries.forEach(
			(child) => { child.update(time, delta); }
		)

		if (this.controls.showDebug.isDown) {
			if (!this.debug) {
				this.physics.world.createDebugGraphic();
				this.debug = true;
			}
		}

	}

	createPlayer() {
		this.map.findObject('Characters', (obj) => {
			if (obj.type === 'playerStart') {
				this.player = new Player(this, obj.x, obj.y);
			}
		})
	}

	createTarget() {
		this.map.findObject('Characters', (obj) => {
			if (obj.type === 'target') {
				this.target = new Target(this, obj.x, obj.y);
			}
		});
	}

	setUpCamera() {
		this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
		this.cameras.main.setDeadzone(20, 20);
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.setZoom(3);
	}

	createMap() {
		this.map = this.make.tilemap({ key: "graveyard" });
		this.tiles = this.map.addTilesetImage('graveyard', 'graveyard', 16, 16, 1, 2);
		this.layers.background = {};
		this.layers.blocked = {};
		this.layers.background.first = this.map.createStaticLayer("Background1", this.tiles, 0, 0);
		this.layers.background.second = this.map.createStaticLayer("Background2", this.tiles, 0, 0);
		this.layers.background.third = this.map.createStaticLayer("Background3", this.tiles, 0, 0);
		this.layers.blocked.first = this.map.createStaticLayer("Blocked1", this.tiles, 0, 0);
		this.layers.blocked.first.setCollisionByExclusion([-1]);
		this.layers.blocked.second = this.map.createStaticLayer("Blocked2", this.tiles, 0, 0);
		this.layers.blocked.second.setCollisionByExclusion([-1]);
		this.layers.foreground = this.map.createStaticLayer("Foreground", this.tiles, 0, 0);
	}

	createSpawners() {
		for (let i = 0; i < this.map.objects.length; i++) {
			if (this.map.objects[i].name === "Spawners") {
				this.spawners = this.map.objects[i];
				break;
			}
		}
		this.spawnerGroup = new Spawners(this.physics.world, this, this.spawners);

		this.spawnerGroup.children.entries.forEach((spawny) => {
			this.toDefeat += spawny.startingLive;
		});
	}

	enemyDeath() {
		this.toDefeat -= 1;
		if (this.toDefeat <= 0) {
			this.playerDone();
		}
	}

	playerDone() {
		if (this.wave < this.waves) {
			this.advanceWave();
		} else {
			this.gameOver();
		}
	}

	advanceWave() {
		this.spawnerGroup.children.entries.forEach((spawny) => {
			this.toDefeat += spawny.startingLive;
			spawny.live = spawny.startingLive + spawny.increment;
		});
		if (this.wave < this.waves) {
			this.wave++;
		} else {
			this.gameOver();
		}

	}

	createTowerGroup() {
		this.towerGroup = new Towers(this.physics.world, this);
	}

	getPath() {
		// find paths layer
		for (let i = 0; i < this.map.objects.length; i++) {
			if (this.map.objects[i].name === "Paths") {
				this.paths = this.map.objects[i];
				break;
			}
		}
		
	}
}
