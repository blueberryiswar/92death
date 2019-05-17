import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, path) {
        super(scene, x, y, key, 0);
        this.scene = scene;
        this.health = 5;
        this.monies = 1;
        this.impact = 200; // Impact of skill towards Player
        this.skillOnCooldown = 0;
        this.cooldown = 800;
        this.damage = 1;
        this.direction = 'down';
        this.reduceVelocity = 5;
        this.flash = 10;
        this.towerTarget = true;
        this.path = path;
        this.pathcounter = 0;
        this.myTarget = this.scene.target;
        this.tolerance = 10;
        this.weight = 1;
        this.currentTarget = { x: this.myTarget.x, y: this.myTarget.y };
        this.blocked = {
            x: 0,
            y: 0
        };

        this.moveSpeed = 20;
        this.targetPadding = {
            x: 2,
            y: 2
        };



        if (this.path) {
            this.currentTarget.x = this.path.x;
            this.currentTarget.y = this.path.y;
        }
        //console.log(this.path);

        // enable physics
        this.scene.physics.world.enable(this);

        // add our player to the scene
        this.scene.add.existing(this);
    }

    pickNextTarget() {
        if (this.path) {
            if (this.path.polyline.length > this.pathcounter) {
                const path = this.path.polyline[this.pathcounter];
                this.currentTarget.x = this.path.x + path.x;
                this.currentTarget.y = this.path.y + path.y;
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
            //console.log('at location');
            return true;
        }
        return false;
    }

    nearEnough(value1, value2) {
        const distance = value1 - value2;
        //console.log(Math.floor(value1 / 16))
        if (Math.abs(distance) < 1) {
            return true;
        }
        return false;

    }

    update(delta) {
        if(this.stunned > 0) {
            this.stunned -= 1 * delta;
            if (this.flash > 0) {
                this.tint = 0xff5500;
                this.flash -= 1 * delta;
            } else {
                this.tint = 0xffffff;
                this.flash = 20;
            }
            return;
        } else if(this.health <= 0) {
            return;
        }
        if(this.skillOnCooldown > 0) {
            this.skillOnCooldown -= 1 * delta;
        }
        this.tint = 0xffffff;
        if (this.animationLock > 0) {
            this.animationLock -= 1 * delta;
            return;
        }
        // check if the up or down key is pressed
        const distance = {
            x:  this.x - this.currentTarget.x,
            y: this.y - this.currentTarget.y
        };
        //console.log(distance);
        if (Math.abs(distance.y) + Math.abs(distance.x) > this.tolerance) {
            if (Math.abs(distance.y) > Math.abs(distance.x) || this.nearEnough(this.blocked.y, this.y)) {
                if (distance.y > !this.nearEnough(this.blocked.x, this.x) || this.nearEnough(this.blocked.x, this.x) && distance.y > 0 || this.nearEnough(this.body.blocked.x, this.x) && distance.y < 0) {
                    this.setVelocityY(this.moveSpeed * -1);
                    this.direction = 'up';
                    if(this.body.blocked.up) {
                        this.blocked.x = this.x;
                    } 
                } else {
                    this.setVelocityY(this.moveSpeed);
                    this.direction = 'down';
                    if(this.body.blocked.down) {
                        this.blocked.x = this.x;
                    }
                }
            } else {
                if (distance.x > 0) {
                    this.setVelocityX(this.moveSpeed * -1);
                    this.direction = 'left';
                    if(this.body.blocked.left) {
                        this.blocked.y = this.y;
                    }
                } else {
                    this.setVelocityX(this.moveSpeed);
                    this.direction = 'right';
                    if(this.body.blocked.right) {
                        this.blocked.y = this.y;
                    }
                }
            }
        } else {
            this.pickNextTarget();
            this.setVelocity(0);
        }

        this.myLoop(delta);
    }
    
    myLoop(delta) {
        console.log("No loop defined");
    }

    doDamage(target) {
        if(this.stunned || this.skillOnCooldown > 0) return;
        this.skill(target);
        this.skillOnCooldown = this.cooldown;
    }

    skill(target) {
        console.log("No skill defined");
    }

    enterGate() {
        this.destroy();
    }
    
    impactFrom(obj, impact) {
        let distance = {};
        distance.x = this.x - obj.x;
        distance.y = this.y - obj.y;
        if (distance.y > 0) {
            distance.dirY = 1;
        } else {
            distance.dirY = -1;
        }
        if (distance.x > 0) {
            distance.dirX = 1;
        } else {
            distance.dirX = -1;
        }
        distance.total = Math.abs(distance.x) + Math.abs(distance.y)
        distance.px = Math.abs(distance.x) / distance.total;
        distance.py = Math.abs(distance.y) / distance.total;
        distance.x = Math.floor(distance.px * impact / this.weight * distance.dirX);
        distance.y = Math.floor(distance.py * impact / this.weight * distance.dirY);
        this.setVelocity(0);
        this.setVelocity(distance.x, distance.y);;
    }

    takeDamage(source, damage, impact = 200, stun = 200) {
        this.health -= damage;
        this.stunned = stun;
        this.impactFrom(source, impact);
        if (this.health <= 0) {
            this.scene.enemyDeath();
            this.scene.player.getMoney(this.monies);
            this.dying();
        }
    }

    dying() {
        this.destroy();
    }

    reduceForce(delta) {
        let reduce = this.reduceVelocity * delta;
        if(this.body.velocity.x > 0) {
            if (this.body.velocity.x - reduce <= 0) {
                this.setVelocityX(0);
            } else {
                this.setVelocityX(this.body.velocity.x - reduce);
            }
        } else {
            if (this.body.velocity.x + reduce >= 0) {
                this.setVelocityX(0);
            } else {
                this.setVelocityX(this.body.velocity.x + reduce);
            }
        }
    
        if(this.body.velocity.y > 0) {
            if (this.body.velocity.y - this.reduceVelocity <= 0) {
                this.setVelocityY(0);
            } else {
                this.setVelocityY(this.body.velocity.y - this.reduceVelocity);
            }
        } else {
            if (this.body.velocity.y + this.reduceVelocity >= 0) {
                this.setVelocityY(0);
            } else {
                this.setVelocityY(this.body.velocity.y + this.reduceVelocity);
            }
        }
    }
}