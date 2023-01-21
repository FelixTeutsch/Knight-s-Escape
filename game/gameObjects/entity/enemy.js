class Enemy extends Entity {
    move = {
        x: 1,
        y: 0
    };

    moveVelocity = 1;
    playerFollowThreshold = 100;
    attack = {
        isAttacking: false,
        isDamaging: false,
        attackPhase: {
            stage: 0,
            start: 5,
            end: 10,
            length: 15
        },
        attacksHit: 0,
        damage: 0,
        attackCooldown: 0
    }
    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        LOGGER.log("Enemy has been created");
        this.useGravity = true;
        this.mass = 1;
        // Set Enemy Stats
        this.health.currentHP = 15;
        this.health.maxHP = 15;
        this.attack.damage = 1;

        // Display Enemy Stats
        this.displayHP(this.health.maxHP, this.health.currentHP);
    }

    update() {

        // get distance to player
        let distanceToPlayer = Math.sqrt((Math.abs(this.position.x - player.position.x) ** 2) + (Math.abs(this.position.y - player.position.y) ** 2));

        if (Math.abs(this.position.x - player.position.x) == 0)
            this.move.x = 0;
        else if (distanceToPlayer < this.playerFollowThreshold)
            if (player.position.x < this.position.x)
                // move towards player if in range
                this.move.x = this.moveVelocity * -1;
            else
                this.move.x = this.moveVelocity;
        if (this.attack.isAttacking && this.attack.attackCooldown <= 0) {
            if (this.attack.attackPhase.stage++ > this.attack.attackPhase.start && this.attack.attackPhase.stage < this.attack.attackPhase.end)
                this.attack.isDamaging = true;
            else
                this.attack.isDamaging = false;
            if (this.attack.attackPhase.stage >= this.attack.attackPhase.length) {
                this.attack.isAttacking = false;
                this.attack.attackPhase.stage = 0;
                LOGGER.log("Cooldown Reset");
                this.attack.attackCooldown = 100;
            }
        } else {
            this.position.x += gameManager.getTimeAdjustedValue(this.move.x);
            this.position.y += gameManager.getTimeAdjustedValue(this.move.y);
        }
        this.attack.attackCooldown--;

        // Round Position
        this.position.x = Math.round(this.position.x);
        this.position.y = Math.round(this.position.y);
    }

    hitAttack() {
        if (this.attack.attackCooldown >= 0 || !this.attack.isAttacking)
            return 0;
        LOGGER.log("Enemy landed a hit...");
        this.attack.attackCooldown = 100;
        return this.attack.damage;
    }

    onCollision(otherObject) {
        if (otherObject.name == "wall" || otherObject.name == "obstacle") {
            this.move.x *= -1;
            this.move.y *= -1;
        } else if (otherObject.name === "player") {
            if (!this.attack.isAttacking && this.attack.attackCooldown <= 0) {
                this.attack.isAttacking = true;
                LOGGER.log("Attack Started!")
            }
            this.restorePosition();
        }
    }
}