import Phaser from 'phaser';
import ScyteBaseAttack from './Skills/ScytheBaseAttack';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 0);
        this.scene = scene;
        this.health = 6;
        this.moveSpeed = 90;
        this.direction = 'right';
        this.flash = 80;
        this.lockSpace = false;
        this.canPlace = true;
        this.stunned = 5000;
        this.cooldowns = {
            scythe: {
                cooldown: 400,
                current: 0,
                damage: 1,
                impact: 200,
                stun: 200
            },
            tower: {
                cooldown: 400,
                current: 0,
                collision: 0
            }
        };
        this.lastVelocity = {
            y: 0,
            x: 0
        };
        this.setAnimations();
        this.stunned = true;
        this.invulnerable = 0;
        this.bucks = 30;
        //this.tint = 0xff0000;
        this.createSelector();
        this.deactivateSelector();
        this.scytheRadius = new ScyteBaseAttack(this.scene, this.x, this.y, this);
        this.scytheRadius.deactivate();

        // enable physics
        this.scene.physics.world.enable(this);

        this.body.setSize(12, 16);
        this.body.setOffset(10, 16);
        this.z = 40;
        // add our player to the scene
        this.scene.add.existing(this);
        this.appear();
    }

    setAnimations() {
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

        this.scene.anims.create({
            key: 'scytheRight',
            frames: this.scene.anims.generateFrameNumbers('scythe', { start: 0, end: 1 }),
            frameRate: 6,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'scytheLeft',
            frames: this.scene.anims.generateFrameNumbers('scythe', { start: 2, end: 3 }),
            frameRate: 6,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'scytheUp',
            frames: this.scene.anims.generateFrameNumbers('scythe', { start: 4, end: 5 }),
            frameRate: 5,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'scytheDown',
            frames: this.scene.anims.generateFrameNumbers('scythe', { start: 6, end: 7 }),
            frameRate: 5,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'appears',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 12 }),
            frameRate: 8,
            repeat: 0
        });

    }

    hitWithScythe() {
        if (this.cooldowns.scythe.current > 0) return;
        this.cooldowns.scythe.current = this.cooldowns.scythe.cooldown;
        let position = {
            x: this.x,
            y: this.y,
            width: 100,
            height: 55
        };
        this.setFlipX(false);
        switch (this.direction) {
            case "up":
                position.y += -10;
                this.anims.play('scytheUp', true);
                break;
            case "down":
                position.y += 25;
                this.anims.play('scytheDown', true);
                break;
            case "left":
                position.x -= 12;
                position.height = 100;
                position.width = 55;
                this.anims.play('scytheLeft', true);
                break;
            case "right":
                position.x += 12;
                position.height = 100;
                position.width = 55;
                this.anims.play('scytheRight', true);
                break;
            default:
                break;
        }

        this.scytheRadius.activate();
        this.scytheRadius.x = position.x - 30;
        this.scytheRadius.y = position.y - 30;
        /*
        var x = position.x - (position.width / 2);
        var y = position.y - (position.height / 2);
        var within = this.scene.physics.overlapRect(x, y, position.width, position.height);

        within.forEach((body) => {
            if (body.gameObject.towerTarget) {
                body.gameObject.takeDamage(this, this.cooldowns.scythe.damage,
                    this.cooldowns.scythe.impact, this.cooldowns.scythe.stun);
            }
        });
        */
    }

    update(delta) {
        //this.tint = 0xffffff;

        if (this.invulnerable > 0) {
            this.invulnerable -= delta * 1;
            if (this.flash > 0) {
                this.tint = 0xaaccee;
                this.flash -= delta * 1;
            } else if (this.flash > -40 && this.flash < 0) {
                this.tint = 0xffffff;
            } else {
                this.flash = 100;
            }
        }

        if (this.stunned > 0) {
            this.stunned -= 1 * delta;
            return
        }

        this.setVelocity(0);

        if (this.cooldowns.scythe.current > 0) {
            this.cooldowns.scythe.current -= delta * 1;
            return
        } else if (this.scytheRadius.active) {
            this.scytheRadius.deactivate();
        }

        if (this.cooldowns.tower.current > 0) {
            this.cooldowns.tower.current -= 1 * delta;
        }

        if (this.scene.controls.buttonPressOnce('baseAttack')) {
            this.hitWithScythe();
            return
        }


        if (this.scene.controls.buttonPressOnce('buildTower') 
            && !this.placingTower 
            && this.cooldowns.tower.current <= 0) {
            this.placeTower();
        }


        const velocity = this.handleMovement();

        this.handleAnimation(velocity);

        if (this.placingTower) {
            this.handleSelector(delta);
        }
        this.depth = this.y + this.height / 2;
    }

    handleMovement() {
        // check if the up or down key is pressed
        let velocity = {
            x: 0,
            y: 0
        };
        if (this.scene.controls.up()) {
            velocity.y = -1 * this.moveSpeed;
            this.direction = 'up';
            this.lastVelocity = velocity;
        } else if (this.scene.controls.down()) {
            velocity.y = this.moveSpeed;
            this.direction = 'down';
            this.lastVelocity = velocity;
        }

        // check if the up or down key is pressed
        if (this.scene.controls.left()) {
            velocity.x = this.moveSpeed * -1;
            this.direction = 'left';
            this.lastVelocity = velocity;
        } else if (this.scene.controls.right()) {
            velocity.x = this.moveSpeed;
            this.direction = 'right';
            this.lastVelocity = velocity;
        }

        if (velocity.y !== 0 && velocity.x !== 0) {
            velocity.y *= 0.6;
            velocity.x *= 0.6;
        }

        this.setVelocity(velocity.x, velocity.y);
        return velocity;
    }

    handleAnimation(velocity) {
        this.setFlip(false);
        if (this.stunned > 0 ) return;
        if (velocity.x === 0 && velocity.y === 0) {
            switch (this.direction) {
                case "up":
                    this.anims.play("idleup", false);
                    break;
                case "down":
                    this.anims.play("idledown", false);
                    break;
                case "left":
                    this.anims.play("idleside", false);
                    this.setFlipX(true);
                    break;
                case "right":
                    this.anims.play("idleside", false);
                    break
                default:
                    break;
            }
        } else {
            switch (this.direction) {
                case "up":
                    this.anims.play("up", true);
                    break;
                case "down":
                    this.anims.play("down", true);
                    break;
                case "left":
                    this.anims.play("sideway", true);
                    this.setFlipX(true);
                    break;
                case "right":
                    this.anims.play("sideway", true);
                    break
                default:
                    break;
            }
        }
    }

    takeDamage(damage, from) {
        console.log('Hit by ' + from);
        if (this.invulnerable > 0) return;
        let impact = 200;
        if (from.impact > 0) {
            impact = from.impact;
        }
        this.impactFrom(from, impact);
        this.health -= damage;
        this.scene.events.emit('healthchange', -1 * damage);
        if (this.health <= 0) {
            this.scene.gameOver();
        }
        this.invulnerable = 1500;
        this.stunned = 200;
    }

    impactFrom(obj, impact) {
        let distance = {};
        distance.x = this.x - obj.x;
        distance.y = this.y - obj.y;
        distance.total = Math.abs(distance.x) + Math.abs(distance.y)
        distance.px = Math.abs(distance.x) / distance.total;
        distance.py = Math.abs(distance.y) / distance.total;
        distance.x = Math.floor(distance.px * impact);
        distance.y = Math.floor(distance.py * impact);
        this.setVelocity(0);
        this.setVelocity(distance.x, distance.y);
    }

    appear() {
        this.stunned = 30000;
        this.anims.play('appears', true);
        this.on('animationcomplete', this.unstun, this);
    }

    unstun() {
        this.stunned = 0;
    }

    getMoney(amount) {
        this.bucks += amount;
        this.scene.events.emit('buckschange', amount);
    }

    spendMoney(amount) {
        if (this.bucks - amount >= 0) {
            this.bucks -= amount;
            this.scene.events.emit('buckschange', -1 * amount);
            return true;
        }
        return false;
    }

    createSelector() {
        const coordinates = this.getCoordinates();
        this.selector = this.scene.physics.add.sprite(coordinates.x, coordinates.y, 'fireTower', 11);
        // enable physics
        this.scene.physics.world.enable(this.selector);
        // add our player to the scene
        this.selector.setSize(32, 32);
        this.selector.setOffset(16, 16);
        this.selector.alpha = 0.6;
        this.scene.add.existing(this.selector);
        this.scene.physics.add.overlap(this.selector, [this.scene.enemies, this.scene.towerGroup], (target, enemy) => {
            target.alpha = 0.2;
            this.canPlace = false;
            this.cooldowns.tower.collision = this.cooldowns.tower.cooldown;
        });
    }

    placeTower() {
        this.placingTower = true;
        this.selector.active = true;
        this.selector.visible = true;
        this.selector.enableBody();

    }

    getCoordinates() {
        let coordinates = {
            x: this.x,
            y: this.y
        };
        switch (this.direction) {
            case 'up':
                coordinates.y -= 42;
                break;
            case 'down':
                coordinates.y += 42;
                break;
            case 'left':
                coordinates.x -= 36;
                break;
            case 'right':
                coordinates.x += 36;
                break;
            default:
                console.warn("Unknown direction");
        }
        return coordinates;
    }

    handleSelector(delta) {
        const coordinates = this.getCoordinates();
        this.selector.x = coordinates.x;
        this.selector.y = coordinates.y;
        if (this.cooldowns.tower.collision > 0) {
            this.cooldowns.tower.collision -= 1 * delta;
        } else {
            this.canPlace = true;
            this.selector.alpha = 0.6;
        }
        if (this.scene.controls.buildTowerState('down')) {
            if (this.canPlace && this.spendMoney(15)) {
                this.scene.towerGroup.createTower({
                    type: 'FireTower',
                    x: this.selector.x,
                    y: this.selector.y
                });
                this.deactivateSelector();
                this.placingTower = false;
                this.cooldowns.tower.current = this.cooldowns.tower.cooldown;
            }
        }
    }

    deactivateSelector() {
        this.selector.disableBody();
        this.selector.active = false;
        this.selector.visible = false;
        this.selector.setVelocity(0);
    }
}