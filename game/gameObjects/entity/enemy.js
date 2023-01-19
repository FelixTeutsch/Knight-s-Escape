class Enemy extends SpriteAnimation {
    move = {
        x: 1,
        y: 0
    };
    playerFollowThreshold = 100;
    attack = {
        isAttacking: false,
        isDamaging: false,
        hp: 10,
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
        this.attack.hp = 15;
        this.attack.damage = 1;
    }

    update() {
        let result = Math.random();

        // get distance to player
        let distanceToPlayer = Math.sqrt((Math.abs(this.position.x - player.position.x) ** 2) + (Math.abs(this.position.y - player.position.y) ** 2));

        if (distanceToPlayer < this.playerFollowThreshold)
            if (player.position.x < this.position.x)
                // move towards player if in range
                this.move.x = Math.min(this.move.x, this.move.x * -1);
            else
                this.move.x = Math.max(this.move.x, this.move.x * -1);
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
            this.position.x += this.move.x;
            this.position.y += this.move.y;
        }
        this.attack.attackCooldown--;
    }

    hitAttack() {
        if (this.attack.attackCooldown >= 0 || !this.attack.isAttacking)
            return 0;
        console.log("Enemy landed a hit...");
        this.attack.attackCooldown = 100;
        return this.attack.damage;
    }

    onCollision(otherObject) {
        if (otherObject.name == "obstacle") {
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