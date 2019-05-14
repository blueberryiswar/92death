import Phaser from "phaser";
import config from "./config";
import GameScene from './Scenes/Game';
import PreloadScene from "./Scenes/Preload";


class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Preload', PreloadScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Preload');
  }
}

window.game = new Game();