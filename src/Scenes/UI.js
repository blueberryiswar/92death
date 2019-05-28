import Phaser from "phaser";
import HitPoint from "../Prefabs/HitPoint";

export default class UIScene extends Phaser.Scene {
	constructor() {
		super({
			key: "UI",
			active: true
		});
	}

	init() {
		this.setDefault();
	}

	preload() {
		this.load.spritesheet('hitpoints', 'assets/gui/flame_tiny.png', {
			frameWidth: 11,
			frameHeight: 13
		});

		this.load.spritesheet('coin', 'assets/gui/coin.png', {
			frameWidth: 16,
			frameHeight: 16
		});

		this.load.spritesheet('numbers', 'assets/gui/numbers.png', {
			frameWidth: 16,
			frameHeight: 16
		});
	}

	setDefault() {
		this.bucks = 30;
		this.health = 7;
		this.hitpoints = [];
	}

	create() {
		// get Reference to the GameScene
		this.gameScene = this.scene.get("Game");
		
		// listen to Events from that Scene
		this.gameScene.events.on("buckschange", (bucks) => {
			this.bucks += bucks;
			this.updateDisplay();
		});

		this.gameScene.events.on("healthchange", (health) => {
			this.health += health;
			this.updateDisplay();
		});

		this.gameScene.events.on("newGame", () => {
			this.setDefault();
		});

		this.setAnimations();
		this.createHitpoints(this.health);

		this.coin = this.add.sprite(58, 110, 'coin', 1);
		this.coin.setScale(2);
		//this.coin.play('coinSpin');

		this.purse = [];
		for(let i = 0; i < 3; i++) {
			let x = 92 + 24 * i;
			const number = this.add.sprite(x, 112, 'numbers');
			number.setScale(2);
			this.purse.push(number);
		}

		this.setDefault();
		this.updateDisplay();

		this.add.text(5, 5, "Pre-Alpha", {font: "12px 8bit", fill:"#fff"});


	}

	removeHitpoints() {
		for(let i = 0; i < this.hitpoints.length; i++) {
			this.hitpoints[i].active = false;
			this.hitpoints[i].visible = false;
			this.hitpoints[i].destroy();
		}
	}

	createHitpoints() {
		this.removeHitpoints();
		this.hitpoints = [];
		let count = this.health;
		let i = 0;
		while (count > 0) {
			const hitpoint = this.getHitpoint(count, i);
			this.hitpoints.push(hitpoint);
			count -= 2;
			i++;
		}
	}

	getHitpoint(number, place) {
		//console.log(number);
		let x = 60 + 32 * place;
		let hitpoint = new HitPoint(this, x, 60, number);
		console.log(hitpoint);
		return hitpoint
	}

	setAnimations() {
		this.anims.create({
			key: 'coinSpin',
			frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 5}),
			frameRate: 12,
			repeat: 0
		});
	}

	updateDisplay() {
		this.updatePurse();
		this.createHitpoints();
	}

	updatePurse() {
		this.purse[0].setFrame(Math.floor(this.bucks / 100));
		this.purse[1].setFrame(Math.floor(this.bucks / 10));
		this.purse[2].setFrame(this.bucks % 10);
		this.coin.play('coinSpin', true);
	}
}