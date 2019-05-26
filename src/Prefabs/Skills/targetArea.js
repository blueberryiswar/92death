import Phaser from 'phaser';

export default class TargetArea extends Phaser.GameObjects.Zone {
    constructor(scene, x, y, radius, tower) {
        super(scene, x, y);
        this.scene = scene;
        this.tower = tower;

        // enable physics
        this.scene.physics.world.enable(this);

        this.body.setCircle(radius);
        this.x = this.x - radius;
        this.y = this.y - radius;
        // add our player to the scene
        this.scene.add.existing(this);
        this.collider = this.scene.physics.add.overlap(this, this.scene.enemies, this.action, null, this);
    }

    action(target, enemy) {
        this.tower.fireAt(enemy);
    }

    activate() {
        this.body.setEnable(true);
        this.setActive(true);
        this.collider = this.scene.physics.add.overlap(this, this.scene.enemies, this.action, null, this);

        
    }

    deactivate() {
        this.body.setEnable(false);
        this.setActive(false);
        this.scene.physics.world.removeCollider(this.collider);
    }
}