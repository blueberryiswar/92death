import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
	constructor(key) {
		super(key);
	}

	preload() {
        this.load.tilemapTiledJSON('greenZone', 'assets/tilesets/greenZone.json');
        this.load.image('greenZone', 'assets/tilesets/greenZone.png');

        this.load.tilemapTiledJSON('graveyard', 'assets/tilesets/graveyard.json');
        this.load.image('graveyard', 'assets/tilesets/graveyard.png');

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
        this.load.spritesheet('scythe', 'assets/characters/scythe.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        
        
        this.load.image('spawner', 'assets/characters/pentragram.png');
        this.load.image('aoe', 'assets/gui/aoe.png');

        this.load.image('title', 'assets/gui/title.png');
    }

	create() {
        this.scene.start('Game');
    }
    
}