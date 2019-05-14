import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
	constructor(key) {
		super(key);
	}

	preload() {
        this.load.tilemapTiledJSON('greenZone', 'assets/tilesets/greenZone.json');
        this.load.image('greenZone', 'assets/tilesets/greenZone.png');
        this.load.spritesheet('ghost', 'assets/characters/ghost.png', {
            frameWidth: 14,
            frameHeight: 14
        });

        this.load.image('logo2', 'assets/logo.png');
    }

	create() {
        this.scene.start('Game');
    }
    
}