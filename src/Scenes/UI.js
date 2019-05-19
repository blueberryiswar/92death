import Phaser from "phaser";

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

		/*
		this.scene.anims.create({
            key: 'coin_still',
            frames: [ { key: 'coin', frame: 0 } ],
            frameRate: 6,
		});
		this.scene.anims.create({
            key: 'coin_spinning',
            frames: this.scene.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
  			frameRate: 6,
			repeat: -1
		});

		this.scene.anims.create({
            key: '1',
            frames: [ { key: 'numbers', frame: 0 } ],
            frameRate: 6,
		});

		this.scene.anims.create({
            key: '2',
            frames: [ { key: 'numbers', frame: 1 } ],
            frameRate: 6,
		});

		this.scene.anims.create({
            key: '3',
            frames: [ { key: 'numbers', frame: 2 } ],
            frameRate: 6,
		});

		this.scene.anims.create({
            key: '4',
            frames: [ { key: 'numbers', frame: 3 } ],
            frameRate: 6,
		});

		this.scene.anims.create({
            key: '5',
            frames: [ { key: 'numbers', frame: 4 } ],
            frameRate: 6,
		});

		this.scene.anims.create({
            key: '6',
            frames: [ { key: 'numbers', frame: 5 } ],
            frameRate: 6,
		});

		this.scene.anims.create({
            key: '7',
            frames: [ { key: 'numbers', frame: 6 } ],
            frameRate: 6,
		});

		this.scene.anims.create({
            key: '8',
            frames: [ { key: 'numbers', frame: 7 } ],
            frameRate: 6,
		});

		this.scene.anims.create({
            key: '9',
            frames: [ { key: 'numbers', frame: 8 } ],
            frameRate: 6,
		});

		this.scene.anims.create({
            key: '0',
            frames: [ { key: 'numbers', frame: 9 } ],
            frameRate: 6,
		});
		*/

		

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
			let hitpoint = this.getHitpoint(count, i);
			this.hitpoints.push(hitpoint);
			count -= 2;
			i++;
		}
	}

	getHitpoint(number, place) {
		console.log(number);
		let x = 60 + 32 * place;
		let hitpoint = this.add.sprite(x, 60, 'hitpoints');
		if (number <= 1) {
			hitpoint.play('hitpointsHalf');
		} else {
			hitpoint.play('hitpointsFull');
		}
		hitpoint.setScale(3);

		return hitpoint
	}

	setAnimations() {
		this.anims.create({
			key: 'hitpointsFull',
			frames: this.anims.generateFrameNumbers('hitpoints', { start: 0, end: 2 }),
			frameRate: 4,
			repeat: -1
		});
		this.anims.create({
			key: 'hitpointsHalf',
			frames: this.anims.generateFrameNumbers('hitpoints', { start: 3, end: 6 }),
			frameRate: 4,
			repeat: -1
		});

		this.anims.create({
			key: 'coinSpin',
			frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 5}),
			frameRate: 12,
			repeat: 0
		});
	}

	updateDisplay() {
		//this.healthText.setText(`Health: ${this.health}`);
		//this.scoreText.setText(`Bucks: ${this.bucks}`);
		this.updatePurse();
		this.createHitpoints();
	}

	updatePurse() {
		/*for(let i = this.purse.length; i > 0; i--) {
			
			this.purse[i-1].setFrame[i];
			//if(monies.length > i + 1) {
			//	console.log('monies: ' + monies + 'bucks: ' + this.bucks + ' pos: ' + i + ' return: ' + monies.charAt(i));
			//	this.purse[i].setFrame(monies.charAt(monies.length - i - 1));
			//}
		}*/
		this.purse[0].setFrame(Math.floor(this.bucks / 100));
		this.purse[1].setFrame(Math.floor(this.bucks / 10));
		this.purse[2].setFrame(this.bucks % 10);
		this.coin.play('coinSpin', true);
	}
}
