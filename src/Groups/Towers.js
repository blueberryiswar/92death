import Phaser from 'phaser';
import Spawner from '../Characters/Spawner';
import FireTower from '../Characters/FireTower';

export default class Towers extends Phaser.Physics.Arcade.StaticGroup {
    constructor(world, scene) {
        super(world, scene);
        this.scene = scene;
       
        let tower = {
            type: 'FireTower',
            x: 207,
            y: 289
        };
        if(tower) {
            this.createTower(tower);
        }
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