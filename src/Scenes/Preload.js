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
        this.load.spritesheet('player', 'assets/characters/player.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('irrlicht', 'assets/characters/irrlicht.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('fireTower', 'assets/towers/fireTower.png', {
            frameHeight: 64,
            frameWidth: 64
        });
        this.load.spritesheet('fireBomb', 'assets/bullets/fireBullet.png', {
            frameWidth: 17,
            frameHeight: 18
        });

        this.load.image('logo2', 'assets/logo.png');
    }

	create() {
        this.scene.start('Game');
    }
    
}