import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 0);
        this.scene = scene;
        this.health = 5;
        this.invulnerable = false;
        this.moveSpeed = 80;
        this.direction = 'up';
        this.lastVelocity = {
            y: 0,
            x: 0
        };
        this.setAnimations();
        this.stunned = true;
        this.bucks = 20;
        //this.tint = 0xff0000;

        // enable physics
        this.scene.physics.world.enable(this);

        this.body.setSize(16, 20);
        this.body.setOffset(8, 12);
        this.z = 40;
        // add our player to the scene
        this.scene.add.existing(this);
        this.scene.time.addEvent({
            delay: 250,
            callbackScope: this,
            callback: this.appear,
            loop: false
        });
    }

    setAnimations() {
        this.scene.anims.create({
            key: 'appear',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 12 }),
            frameRate: 8,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'idleside',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 12, end: 12 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idledown',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 19, end: 19 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idleup',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 23, end: 23 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'sideway',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 13, end: 18 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 19, end: 22 }),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 23, end: 26 }),
            frameRate: 5,
            repeat: -1
        });

    }

    update(cursors) {
        this.buttonpressed = false;
        if (this.stunned) return;
        // check if the up or down key is pressed
        let velocity = {
            x: 0,
            y: 0
        };
        if (cursors.up.isDown) {
            velocity.y = -1 * this.moveSpeed;
            this.direction = 'up';
            this.anims.play("up", true);
            this.lastVelocity = velocity;
        } else if (cursors.down.isDown) {
            velocity.y = this.moveSpeed;
            this.direction = 'down';
            this.anims.play("down", true);
            this.lastVelocity = velocity;
        }

        // check if the up or down key is pressed
        if (cursors.left.isDown) {
            velocity.x = this.moveSpeed * -1;
            this.direction = 'left';
            if (velocity.y === 0) {
                this.anims.play("sideway", true);
                this.setFlipX(true);
            }
            this.lastVelocity = velocity;
        } else if (cursors.right.isDown) {
            velocity.x = this.moveSpeed;
            this.direction = 'right';
            if (velocity.y === 0) {
                this.anims.play("sideway", true);
                this.setFlipX(false);
            }
            this.lastVelocity = velocity;
        } else {
            if (velocity.y === 0) {
                if (!this.lastVelocity.y === 0) {
                    if ( this.lastVelocity.y > 0){
                        this.play('idleup', true);
                    } else {
                        this.play('idledown', true);
                    }
                } else {
                    this.play('idleside', true);
                }
                
            } 
        }
        
        if (velocity.y !== 0 && velocity.x != 0) {
            velocity.y *= 0.6;
            velocity.x *= 0.6;
        }

        this.setVelocity(velocity.x, velocity.y);
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

    appear() {
        this.anims.play('appear', true);
        this.scene.time.addEvent({
            delay: 1400,
            callbackScope: this,
            callback: this.unstun,
            loop: false
        });
    }

    unstun() {
        this.stunned = false;
    }

    getMoney(amount) {
        this.money += amount;
    }

    spendMoney(amount) {
        if (this.money - amount >= 0) {
            this.money -= amount;
            return true;
        }
        return false;
    }
}