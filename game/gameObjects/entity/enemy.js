class Enemy extends Entity {
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
        attackCooldown: 0,
        cooldown: {
            current: 0,
            max: 0
        },
        playerContact: false
    }

    constructor(name, x, y, width, height, src) {
        src ??= "./image/entity/enemy/enemy.png";
        super(name, x, y, width, height, src);
        this.image.addEventListener("load", () => {
            this.addAnimationInformation("enemy_attack_right", 0, 10); //( 6 / 7 is doing dmg)
            this.addAnimationInformation("enemy_attack_left", 18, 28); // (24 / 25 is doing dmg)
            this.addAnimationInformation("enemy_walk_left", 36, 43);
            this.addAnimationInformation("enemy_walk_right", 55, 61);
            this.addAnimationInformation("enemy_idle", 72, 89);

            this.setCurrentAnimationByName("enemy_walk_right");
        });
        LOGGER.log("Enemy has been created");
        this.useGravity = true;
        this.mass = 1;
        this.move.velocity = 1;
        this.move.direction.previous = 1;
        this.move.direction.current = 1;
        // Set Enemy Stats
        this.health.currentHP = 15;
        this.health.maxHP = 15;
        this.attack.damage = 1;

        this.boundaryOffsets.bottom = -1;
        // this.boundaryOffsets.top = 1;
        this.boundaryOffsets.right = -1;
        this.boundaryOffsets.left = 1;

        // Set attack cooldown
        this.attack.cooldown.max = 200;

        // Display Enemy Stats
        this.displayHP(this.health.maxHP, this.health.currentHP);
    }

    update() {

        // Check for death
        if (this.health.currentHP == 0) {
            this.isActive = false;
            // spawn healing potion
            if (Math.random() > 0.9)
                new Potion("potion", this.position.x, this.position.y, "bonus", 1);
            else if ((Math.random() + (1 - ((1 / ++this.attack.attacksHit)))) > 1)
                new Potion("potion", this.position.x, this.position.y, "normal", 1);
        }

        this.move.direction.current = ((this.move.x < 0) ? -1 : ((this.move.x > 0) ? 1 : 0));
        let direction = (this.move.direction.current >= 0 ? "right" : "left");

        // Move Enemy to Player
        let distanceToPlayer = Math.sqrt((Math.abs(this.boundaries.getLeftBoundary() - player.boundaries.getLeftBoundary()) ** 2) + (Math.abs(this.boundaries.getTopBoundary() - player.boundaries.getTopBoundary()) ** 2));
        if (Math.abs(this.boundaries.getLeftBoundary() - player.boundaries.getLeftBoundary()) == 0)
            this.move.x = 0;
        else if (distanceToPlayer < this.playerFollowThreshold)
            if (player.boundaries.getLeftBoundary() < this.boundaries.getLeftBoundary())
                // move towards player if in range
                this.move.x = this.move.velocity * -1;
            else
                this.move.x = this.move.velocity;


        // Attack
        if (this.attack.playerContact || this.currentAnimation === "enemy_attack_left" || this.currentAnimation === "enemy_attack_right")
            if (this.attack.cooldown.current <= 0) {
                this.setCurrentAnimationByName("enemy_attack_" + direction);
                this.attack.isDamaging = false;
                if (this.currentAnimationFrame == 6 || this.currentAnimationFrame == 7 ||
                    this.currentAnimationFrame == 24 || this.currentAnimationFrame == 25) {
                    this.attack.isDamaging = true;
                } else if (this.currentAnimationFrame == this.currentEndFrame) {
                    this.attack.cooldown.current = this.attack.cooldown.max;
                    this.attack.playerContact = false;
                }
            } else if (this.attack.playerContact && this.attack.cooldown.current > 0) {
                this.attack.isDamaging = false;
                if (this.currentAnimationFrame == this.currentEndFrame)
                    this.setCurrentAnimationByName("enemy_idle");
                this.attack.cooldown.current--;
                return;
            }

        // Move Player
        if (!this.attack.playerContact) {
            // TODO: Implement Detection for running into a wall & go into idle
            // Move Player
            this.position.x += gameManager.getTimeAdjustedValue(this.move.x);
            this.position.y += gameManager.getTimeAdjustedValue(this.move.y);

            if (this.isLoaded)
                // Set Animation
                if (this.move.direction.current == 0) {
                    this.setCurrentAnimationByName("enemy_idle");
                } else
                    this.setCurrentAnimationByName("enemy_walk_" + direction);
        }
        this.attack.cooldown.current--;

        this.position.x = Math.round(this.position.x);
        this.position.y = Math.round(this.position.y);
        /*
                this.move.direction.current = ((this.move.x < 0) ? -1 : ((this.move.x > 0) ? 1 : 0));
                if (this.isLoaded) {
        
                    if (this.attack.isAttacking && this.attack.attackCooldown <= 0) {
                        this.setCurrentAnimationByName("enemy_attack_" + direction);
                        if (this.currentAnimationFrame == 6 || this.currentAnimationFrame == 7 || this.currentAnimationFrame == 24 || this.currentAnimationFrame == 25) {
                            this.position.x += this.move.direction.current;
                            this.attack.isDamaging = true;
                        } else
                            this.attack.isDamaging = false;
                        if (this.currentAnimationFrame != this.currentEndFrame)
                            return;
                        else {
                            this.attack.attackCooldown = 100;
                            this.isAttacking = false;
                        }
                    }
        
                    this.move.direction.previous = this.move.direction.current;
                    //
                }*/
    }

    hitAttack() {
        if (this.attack.cooldown.current >= 0 || !this.attack.isDamaging)
            return 0;
        this.attack.cooldown.current = this.attack.cooldown.max;
        this.attack.isDamaging = false;
        this.attack.attacksHit++;
        return this.attack.damage;
    }

    onCollision(otherObject) {
        if (otherObject.name == "wall" || otherObject.name == "obstacle") {
            this.move.x *= -1;
            this.move.y *= -1;
        } else if (otherObject.name === "player") {
            this.attack.playerContact = true;
        }
    }

    walkLeftAnimation() {

    }
}