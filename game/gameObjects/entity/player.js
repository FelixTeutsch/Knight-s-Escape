class Player extends Entity {

    movement = {
        directionFacing: 0,
        jumps: 2,
        dashCooldown: 0,
        startJump: false,
        dashTimer: 0
    }

    weapon = {
        weaponList: [],
        selectedWeapon: 0,
        attack: {
            isAttacking: false,
            duration: 0,
            stage: 0
        }
    }

    jumpHold = false;

    isAttacking = false;

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);

        this.useGravity = true;
        this.mass = .6;

        this.weapon.weaponList.push(new Sword());
        this.weapon.weaponList.push(new Bow());
        this.weapon.weaponList.push(new Shield());
        let temp = this.weapon.weaponList[this.weapon.selectedWeapon];
        temp.selectWeapon();

        this.move.x = 0;

        // HP Setup:
        this.health.maxHp = 5;
        this.health.maxBonusHp = 3;
        this.health.currentHp = this.health.maxHp;
        this.health.bonusHP = 1;
        this.health.heartSprite = [];
        this.health.bonusHeartSprite = [];

        for (let i = 0; i < this.health.currentHp; i++) {
            this.health.heartSprite.push(new Heart(104 + (8 + 1) * i, gameManager.canvas.canvasHTMLElement.height - 22));
        }
        for (let i = 0; i < this.health.bonusHP; i++) {
            this.health.bonusHeartSprite.push(new BonusHeart(104 + (8 + 1) * this.health.maxHp + (8 + 1) * i, gameManager.canvas.canvasHTMLElement.height - 22));
        }


        this.boundaryOffsets.bottom = -1;

        this.image.addEventListener("load", () => {
            this.addAnimationInformation("player_walk_right", 0, 7);
            this.addAnimationInformation("player_walk_left", 8, 15);
            this.addAnimationInformation("player_idle_right", 32, 34);
            this.addAnimationInformation("player_idle_left", 40, 42);
            // Jump Right
            this.addAnimationInformation("player_jump_start_right", 16, 18);
            this.addAnimationInformation("player_jump_hold_right", 18, 18);
            this.addAnimationInformation("player_jump_double_right", 19, 19);
            this.addAnimationInformation("player_jump_right", 20, 20);
            this.addAnimationInformation("player_land_right", 21, 23);
            // Jump Left
            this.addAnimationInformation("player_jump_start_left", 24, 26);
            this.addAnimationInformation("player_jump_hold_left", 26, 26);
            this.addAnimationInformation("player_jump_double_left", 27, 27);
            this.addAnimationInformation("player_jump_left", 28, 28);
            this.addAnimationInformation("player_land_left", 29, 31);
        });

        this.health.changed = true;
    }

    update() {
        if (this.health.death.isDead && this.health.death.deathAnimationFrame++ >= this.health.death.deathAnimationFrameEnd) {
            this.isActive = false;
            gameManager.gameOver = true;
            return;
        }
        if (this.movement.dashCooldown-- > 0) {
            this.move.x = gameManager.getTimeAdjustedValue(this.move.velocity * this.movement.directionFacing * 2);
            LOGGER.log(this.position.y, this.position.x);
            //LOGGER.log(this.movement.dashCooldown);
        } /*else {
            this.move.x = this.move.velocity * this.movement.directionFacing;
        }*/
        this.position.x += gameManager.getTimeAdjustedValue(this.move.x);
        this.position.y += gameManager.getTimeAdjustedValue(this.move.y);

        this.checkWorldPostion();

        if (this.movement.startJump) {
            if (this.movement.jumps == 1)
                this.addAntiGravityForce(12);
            if (this.movement.jumps == 0)
                this.addAntiGravityForce(8);
            this.movement.startJump = false;
        }
        if (this.health.changed) {
            this.updateHeartSprites();
            this.health.changed = false;
            LOGGER.log("HP Updated!");
        }

        // ROUND POSITION
        this.position.x = Math.round(this.position.x);
        this.position.y = Math.round(this.position.y);

        // Animations
        if (this.isLoaded) {
            let direction = (this.movement.directionFacing >= 0 ? "right" : "left");
            // Do The Landing!
            if (!this.isFalling && this.antiGravityForce <= 0 && (
                this.currentAnimation === "player_jump_double_right" ||
                this.currentAnimation === "player_jump_right" ||
                this.currentAnimation === "player_land_right" ||
                this.currentAnimation === "player_jump_double_left" ||
                this.currentAnimation === "player_jump_left" ||
                this.currentAnimation === "player_land_left"
            )) {
                this.setCurrentAnimationByName("player_land_" + direction);
                this.animationDurationPerFrame = 1
                console.log("Player is landing");
                if (this.currentAnimationFrame != this.currentEndFrame)
                    return;
            }

            if (this.jumpHold) {
                console.log("Holding Jump")
                this.animationDurationPerFrame = 5;
                if ((this.currentAnimation === "player_jump_start_left" || this.currentAnimation === "player_jump_start_right") && this.currentAnimationFrame != this.currentEndFrame)
                    this.setCurrentAnimationByName("player_jump_start_" + direction);
                else
                    this.setCurrentAnimationByName("player_jump_hold_" + direction);
            } else if (this.move.x == 0 && !this.isFalling && this.antiGravityForce <= 0) {
                this.setCurrentAnimationByName("player_idle_" + direction);
                this.animationDurationPerFrame = 10;
            } else if (this.move.x != 0 && !this.isFalling && this.antiGravityForce <= 0) {
                this.setCurrentAnimationByName("player_walk_" + direction);
                this.animationDurationPerFrame = 5;
            } else if (this.isFalling || this.antiGravityForce >= 0) {
                this.animationDurationPerFrame = 1;
                if /*(this.currentAnimation === "player_jump_right" || this.currentAnimation === "player_jump_left" ||
                ((this.currentAnimation === "player_jump_start_left" || this.currentAnimation === "player_jump_start_right")
                && this.currentAnimationFrame == this.currentEndFrame))*/
                    (this.currentAnimationFrame == this.currentEndFrame) {
                    this.setCurrentAnimationByName("player_jump_" + direction);
                } else {
                    this.animationDurationPerFrame = 5;
                    this.setCurrentAnimationByName("player_jump_double_" + direction);
                }
            }
        }
    }

    checkWorldPostion() {
        if (this.boundaries.getBottomBoundary() <= gameManager.canvas.canvasBoundaries.top) {
            this.position.y = gameManager.canvas.canvasBoundaries.bottom;
        }
        else if (this.boundaries.getTopBoundary() >= gameManager.canvas.canvasBoundaries.bottom) {
            this.position.y = gameManager.canvas.canvasBoundaries.top - this.dimensions.height;
        }
        else if (this.boundaries.getRightBoundary() <= gameManager.canvas.canvasBoundaries.left) {
            this.position.x = gameManager.canvas.canvasBoundaries.right;
        }
        else if (this.boundaries.getLeftBoundary() >= gameManager.canvas.canvasBoundaries.right) {
            this.position.x = gameManager.canvas.canvasBoundaries.left - this.dimensions.width;
        }
    }

    onCollision(otherObject) {
        if (otherObject.name === "enemy" && !this.isAttacking) {
            let enemy = otherObject;
            if (enemy.attack.isAttacking == true) {
                let dmg = enemy.hitAttack();
                this.takeDamage(dmg);
            }
            if (this.position.x < otherObject.position.x && this.movement.directionFacing > 0 ||
                this.position.x > otherObject.position.x && this.movement.directionFacing < 0)
                this.restorePosition();
            // if (this.movement.dashCooldown <= 0)
            // // fix this
            //     this.position.x += this.movement.directionFacing * (this.getBoundaryWidth() + otherObject.getBoundaryWidth());
        } else if (otherObject.name === "wall") {

        }
    }
    /*draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "yellow";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.singlePartHeight);
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y + this.singlePartHeight + this.offset , this.dimensions.width, this.singlePartHeight);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.closePath();   
    }*/

    selectNewWeapon(newWeapon) {
        let temp = this.weapon.weaponList[this.weapon.selectedWeapon];
        temp.deselectWeapon();
        this.weapon.selectedWeapon = newWeapon;

        temp = this.weapon.weaponList[this.weapon.selectedWeapon];
        temp.selectWeapon();
        LOGGER.log(temp.name, "selected!")
    }


    // Player HP
    takeDamage(damage) {
        if (this.health.bonusHP == 0)
            this.health.currentHp -= damage;
        else if (this.health.bonusHP - damage < 0) {
            damage -= this.health.bonusHP
            this.health.bonusHP = 0;
            this.health.currentHp -= damage;
        } else {
            this.health.bonusHP -= damage;
        }
        if (this.health.currentHp < 0)
            this.health.currentHp = 0;
        this.health.changed = true;
        this.checkDeath();
        return this.health.currentHp;
    }
    heal(hp) {
        this.health.changed = true;
        return this.health.currentHp = Math.min(hp + this.health.currentHp, this.health.maxHp);
    }
    bonusHP(healPoints) {
        this.health.changed = true;
        return this.health.bonusHP = Math.min(healPoints + this.health.bonusHP, this.health.maxBonusHp);
    }

    updateHeartSprites() {
        for (let i = 0; i < this.health.currentHp; i++)
            this.health.heartSprite[i].fullHeart();

        for (let i = this.health.currentHp; i < this.health.maxHp; i++)
            this.health.heartSprite[i].emptyHeart();

        if (this.health.bonusHeartSprite.length > this.health.bonusHP) {
            // Remove Access Bonus HP
            for (let i = this.health.bonusHP; i < this.health.bonusHeartSprite.length; i++)
                this.health.bonusHeartSprite[i].isActive = false;
            this.health.bonusHeartSprite.splice(this.health.bonusHP);

        } else if (this.health.bonusHeartSprite.length < this.health.bonusHP)
            // Add Missing Bonus HP
            for (let i = this.health.bonusHeartSprite.length; i < this.health.bonusHP; i++)
                this.health.bonusHeartSprite.push(new BonusHeart(104 + (8 + 1) * this.health.maxHp + (8 + 1) * i, gameManager.canvas.canvasHTMLElement.height - 22));
    }



    // Player Movement
    walkLeft(start) {
        if (!start) {
            this.move.x = 0;
            return false;
        }
        if (this.move.y != 0 || this.move.x != 0) {
            return false;
        }
        this.movement.directionFacing = -1;
        this.move.y = 0;
        this.move.x = -this.move.velocity;

        return true;
    }

    walkRight(start) {
        if (!start) {
            this.move.x = 0;
            return false;
        }
        if (this.move.y != 0 || this.move.x != 0) {
            return false;
        }
        this.movement.directionFacing = 1;
        this.move.y = 0;
        this.move.x = this.move.velocity;

    }

    jump() {
        if ((this.isFalling || this.antiGravityForce > 0) && this.movement.jumps <= 0) {
            if (this.movement.jumps == 2)
                this.movement.jumps = 1;
            else
                return false;
        }
        if (!this.isFalling && this.antiGravityForce <= 0)
            this.movement.jumps = 2;
        this.movement.jumps--;
        this.movement.startJump = true;
        return true;
    }

    crouch(start) {
        if (!start) {

        }
        // TODO: Implement crouch logic
        return true;
    }

    dash() {
        if (this.movement.dashCooldown > 0) {
            LOGGER.log(this.movement.dashCooldown);
            return false;
        }
        LOGGER.log("Dashing");
        this.movement.dashCooldown = 10;
        return true;
    }

    attack() {
        this.attack.isAttacking;
    }

    getHP() {
        return this.health.currentHp + this.health.bonusHP;
    }
    getHearts() {
        return this.health.currentHP;
    }
    getBonusHP() {
        return this.health.bonusHP;
    }

}