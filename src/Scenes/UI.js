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

	setDefault() {
		this.bucks = 30;
		this.health = 6;
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

		// create Score text
		this.scoreText = this.add.text(12, 12, ` `, {
			fontSize: "32px",
			fill: "#fff"
		});

		// create Health text
		this.healthText = this.add.text(12, 50, 
			` `, {
			fontSize: "32px",
			fill: "#fff"
		});

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

		this.setDefault();
		this.updateDisplay();
	}

	updateDisplay() {
		this.healthText.setText(`Health: ${this.health}`);
		this.scoreText.setText(`Bucks: ${this.bucks}`);
	}
}
