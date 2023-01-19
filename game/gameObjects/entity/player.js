class Player extends SpriteAnimation {
    move = {
        horizontal: 0,
        vertical: 0
    };

    movement = {
        directionFacing: 0,
        jumps: 2,
        dashCooldown: 0,
        startDash: false,
        startJump: false,
        moveVelocity: 2,
        dashTimer: 0
    }

    weapon = {
        weaponList: [],
        selectedWeapon: 0
    }

    isAttacking = false;

    health = {
        maxHp: 0,
        maxBonusHp: 0,
        currentHp: 0,
        bonusHP: 0,
        heartSprite: [],
        bonusHeartSprite: [],
        changed: false
    }

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        LOGGER.log("PlayerFigure has been created");
        this.useGravity = true;
        this.mass = .6;

        this.weapon.weaponList.push(new Sword());
        this.weapon.weaponList.push(new Bow());
        this.weapon.weaponList.push(new Shield());
        let temp = this.weapon.weaponList[this.weapon.selectedWeapon];
        temp.selectWeapon();

        // HP Setup:
        this.health.maxHp = 5;
        this.health.maxBonusHp = 3;
        this.health.currentHp = this.health.maxHp;
        this.health.bonusHP = 1;


        for (let i = 0; i < this.health.currentHp; i++) {
            this.health.heartSprite.push(new Heart(124 + (8 + 1) * i, 29));
        }
        for (let i = 0; i < this.health.bonusHP; i++) {
            this.health.bonusHeartSprite.push(new BonusHeart(124 + (8 + 1) * this.health.maxHp + (8 + 1) * i, 29));
        }

        this.health.changed = true;
    }

    update() {
        if (this.movement.startDash) {
            this.movement.startDash = false;
        }
        if (this.movement.dashCooldown-- > 0) {
            this.position.x += this.movement.moveVelocity * this.movement.directionFacing * 2;
            console.log(this.movement.dashCooldown);
        } else {
            this.position.x += this.move.horizontal;
            this.position.y += this.move.vertical;
        }
        this.checkWorldPostion();

        if (this.movement.startJump) {
            this.addAntiGravityForce(45); // og 300 - too much
            this.movement.startJump = false;
        }
        if (this.health.changed) {
            this.updateHeartSprites();
            this.health.changed = false;
            LOGGER.log("HP Updated!");
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
                this.restorePosition();
            }
        } else if (otherObject.name === "wall") {
            this.movement.dashCooldown = 0;
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
        return this.health.currentHp;
    }
    heal(healPoints) {
        this.health.changed = true;
        return this.health.currentHp = Math.min(healPoints + this.health.currentHp, this.health.maxHp);
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
                this.health.bonusHeartSprite.push(new BonusHeart(124 + (8 + 1) * this.health.maxHp + (8 + 1) * i, 29));
    }



    // Player Movement
    walkLeft(start) {
        if (!start) {
            this.move.horizontal = 0;
            return false;
        }
        if (this.move.vertical != 0 || this.move.horizontal != 0) {
            return false;
        }
        this.movement.directionFacing = -1;
        this.move.vertical = 0;
        this.move.horizontal = -this.movement.moveVelocity;

        return true;
    }

    walkRight(start) {
        if (!start) {
            this.move.horizontal = 0;
            return false;
        }
        if (this.move.vertical != 0 || this.move.horizontal != 0) {
            return false;
        }
        this.movement.directionFacing = 1;
        this.move.vertical = 0;
        this.move.horizontal = this.movement.moveVelocity;

    }
    jump() {
        if ((this.isFalling || this.antiGravityForce > 0) && this.jumps <= 0) {
            return false;
        }
        if (!this.isFalling && this.antiGravityForce < 0)
            this.jumps = 2;
        this.jumps--;
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
        this.movement.startDash = true;
        return true;
    }

    getHP() {
        return this.health.currentHp;
    }
    getBonusHP() {
        return this.health.bonusHP;
    }

}