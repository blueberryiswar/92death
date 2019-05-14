import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
	constructor(key) {
		super(key);
	}

	preload() {
        this.load.tilemapTiledJSON('play', 'assets/tilesets/play.json');
        this.load.tilemapTiledJSON('greenZone', 'assets/tilesets/greenZone.json');
        this.load.spritesheet('greenerror', 'assets/tilesets/greenerror.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image('greenZone', 'assets/tilesets/greenZone.png');
        this.load.spritesheet('ghost', 'assets/characters/ghost.png', {
            frameWidth: 17,
            frameHeight: 21
        });

        this.load.image('logo2', 'assets/logo.png');
    }

	create() {
        this.scene.start('Game');
    }
    
}