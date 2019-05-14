import 'phaser';

export default {
	  type: Phaser.AUTO,
	  parent: "phaser-example",
	  width: 380,
	  height: 190,
	  zoom: 4,
	  pixelArt: true,
	  roundPixels: true,
	  physics: {
	  	default: 'arcade',
	  	arcade: {
	  		gravity: { y: 0 },
	  		debug: true
	  	}
	  }
};

