import Phaser from 'phaser';

export default class Ghost extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, path) {
        super(scene, x, y, 'ghost', 0);
        this.scene = scene;
        this.health = 5;
        this.damage = 1;
        this.setAnimations();
        this.z = 50;
        this.towerTarget = true;
        this.path = path;
        this.pathcounter = 0;
        this.myTarget = this.scene.target;
        this.tolerance = 10;
        this.currentTarget = { x: this.myTarget.x, y: this.myTarget.y };

        this.moveSpeed = Phaser.Math.Between(15, 25);
        this.targetPadding = {
            x: Phaser.Math.Between(1, 8),
            y: Phaser.Math.Between(1, 8)
        };



        if (this.path) {
            this.currentTarget.x = this.path.x;
            this.currentTarget.y = this.path.y;
        }
        console.log(this.path);

        // enable physics
        this.scene.physics.world.enable(this);

        this.body.setSize(12, 12);
        this.body.setOffset(1, 1);

        //this.body.setSize(10, 10);
        //this.body.setOffset(3, 10);
        // add our player to the scene
        this.scene.add.existing(this);
    }

    setAnimations() {
        this.scene.anims.create({
            key: 'ghostDown',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ghostRight',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ghostLeft',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 8, end: 11 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ghostUp',
            frames: this.scene.anims.generateFrameNumbers('ghost', { start: 12, end: 15 }),
            frameRate: 4,
            repeat: -1
        });

    }

    pickNextTarget() {
        if (this.path) {
            if (this.path.polyline.length > this.pathcounter) {
                const path = this.path.polyline[this.pathcounter];
                this.currentTarget.x = this.x + path.x;
                this.currentTarget.y = this.y + path.y;
                this.pathcounter++;
                return;
            }
        }
        this.currentTarget.x = this.myTarget.x;
        this.currentTarget.y = this.myTarget.y;
    }

    atLocation() {
        const distance = Math.abs(this.x - this.currentTarget.x) + Math.abs(this.y - this.currentTarget.y);
        if (distance > this.tolerance) {
            this.pickNextTarget();
            console.log('at location');
            return true;
        }
        return false;
    }

    update() {

        // check if the up or down key is pressed
        const distance = {
            x:  this.x - this.currentTarget.x,
            y: this.y - this.currentTarget.y
        };
        console.log(distance);
        if (Math.abs(distance.y) + Math.abs(distance.x) > this.tolerance) {
            if (Math.abs(distance.y) > Math.abs(distance.x)) {
                if (distance.y > 0) {
                    this.setVelocityY(this.moveSpeed * -1);
                    this.direction = 'up';
                    this.anims.play("ghostUp", true);
                } else {
                    this.setVelocityY(this.moveSpeed);
                    this.direction = 'down';
                    this.anims.play("ghostDown", true);
                }
            } else {
                if (distance.x > 0) {
                    this.setVelocityX(this.moveSpeed * -1);
                    this.direction = 'left';
                    this.anims.play("ghostLeft", true);
                } else {
                    this.setVelocityX(this.moveSpeed);
                    this.direction = 'right';
                    this.anims.play("ghostLeft", true);
                }
            }
        } else {
            this.pickNextTarget();
            this.setVelocity(0);
        }
    }

    loseHealth() {
        this.health--;
        this.scene.events.emit('loseHealth', this.health);
        if (this.health === 0) {
            this.scene.loadNextLevel(true);
        }
        this.invulnerable = true;
    }

    enemyCollision() {
        if (!this.invulnerable) {
            this.loseHealth();
            this.tint = 0xff0000;
            this.scene.time.addEvent({
                delay: 1200,
                callback: () => {
                    this.invulnerable = false;
                    this.tint = 0xffffff;
                },
                callbackScope: this
            });
        }
    }

    doDamage(target) {
        this.takeDamage(5);
    }

    enterGate() {
        this.destroy();
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.scene.enemyDeath();
            this.destroy();
        }
    }
}