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

    hp = 6;
    bonusHP = 0;



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
            this.addAntiGravityForce(300);
            this.movement.startJump = false;
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
                if (this.bonusHP == 0)
                    this.hp -= dmg;
                else if (this.bonusHP - dmg < 0) {
                    dmg -= this.bonusHP
                    this.bonusHP = 0;
                    this.hp -= this.bonusHP;
                } else {
                    this.bonusHP -= dmg;
                }
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
        if (!this.isFalling || this.antiGravityForce < 0)
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
        return this.hp;
    }
    getBonusHP() {
        return this.bonusHP;
    }

}