import Phaser from 'phaser';
import FireTower from '../Characters/Towers/FireTower';

export default class Towers extends Phaser.Physics.Arcade.StaticGroup {
    constructor(world, scene) {
        super(world, scene);
        this.scene = scene;
    }

    createTower(tower) {
        let obj = undefined;
        switch(tower.type) {
            case 'FireTower':
                obj = new FireTower(this.scene, tower.x, tower.y);
                break;
            default:
                return false;
        }
        this.add(obj);
        return true;
    }

}