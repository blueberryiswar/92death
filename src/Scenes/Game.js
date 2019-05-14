import Phaser from "phaser";
import Player from "../Characters/Player";


export default class GameScene extends Phaser.Scene {
	constructor(key) {
		super(key);
		
	}

	init() {
		this.layers = {};
	}

	create() {
		console.log("Test");
		this.createMap();
		this.cursors = this.input.keyboard.createCursorKeys();
		this.createPlayer();

	}

	update() {
		this.player.update(this.cursors);
	}

	createPlayer() {
		this.player = new Player(this, 5, 5);
		this.cameras.main.startFollow(this.player, true, 0.2, 0.2, 5, 5);
	}

	createMap() {
		this.map = this.make.tilemap({key: "play"});
		this.tiles = this.map.addTilesetImage('greenerror');
		//this.map = this.make.tilemap({key: "testMap"});
		//this.tiles = this.map.addTilesetImage('green', 'green', 16, 16, 1, 2);
		console.log(this.map);
		this.layers.background = this.map.createStaticLayer("Background", this.tiles, 0, 0);
	}
}
