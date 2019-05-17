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



	var coin_still = game.add.sprite(100,100,'coin');
	sprite.frame = 0;

	setAnimations() {
		this.scene.anims.create({
            key: 'coin_still',
            frames: this.scene.anims.generateFrameNumbers('coin', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
		});
		this.scene.anims.create({
            key: 'coin_spinning',
            frames: this.scene.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
            frameRate: 4,
            repeat: -1
		});

	}

	create() {
		// get Reference to the GameScene
		this.gameScene = this.scene.get("Game");

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
		this.scoreText.setText(`${this.bucks}`);
	}
}
