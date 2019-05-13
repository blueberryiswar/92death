import Phaser from "phaser";
import logoImg from "../assets/logo.png";

export default class GameScene extends Phaser.Scene {
	constructor(key) {
		super(key);
		
	}

	preload() {
		this.load.image("logo", logoImg);
	}

	create() {
		const logo = this.add.image(400, 150, "logo");
	}
}
