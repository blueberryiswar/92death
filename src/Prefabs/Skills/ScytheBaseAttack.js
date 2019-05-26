import Phaser from 'phaser';

export default class ScyteBaseAttack extends Phaser.GameObjects.Zone {
    constructor(scene, x, y, hero) {
        super(scene, x, y);
        this.scene = scene;
        this.hero = hero;

        // enable physics
        this.scene.physics.world.enable(this);

        this.body.setCircle(30);
        // add our player to the scene
        this.scene.add.existing(this);
        this.collider = this.scene.physics.add.overlap(this, this.scene.enemies, this.action, this);
    }

    action(target, enemy) {
        enemy.takeDamage(this.hero, this.hero.cooldowns.scythe.damage,
            this.hero.cooldowns.scythe.impact, this.hero.cooldowns.scythe.stun);
    }

    activate() {
        this.body.setEnable(true);
        this.setActive(true);
        this.collider = this.scene.physics.add.collider(this, this.scene.enemies, this.action, null, this);

        
    }

    deactivate() {
        this.body.setEnable(false);
        this.setActive(false);
        this.scene.physics.world.removeCollider(this.collider);
    }
}