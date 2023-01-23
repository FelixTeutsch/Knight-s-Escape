class Entity extends SpriteAnimation {
    move = {
        x: 1,
        y: 0,
        velocity: 4
    };

    health = {
        maxHP: 0,
        currentHP: 0,
        death: {
            isDead: false,
            deathAnimationFrame: 0,
            deathAnimationFrameEnd: 1
        }
    };

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
    }

    update() {
        if (this.health.death.isDead && this.health.death.deathAnimationFrame >= this.health.death.eathAnimationFrameEnd)
            this.isActive = false;
    }

    onCollision(otherObject) {

    }

    attack() {

    }

    takeDamage(damage) {
        LOGGER.log(Math.max(this.health.currentHP - damage, 0));
        this.health.currentHP = Math.min(Math.max(this.health.currentHP - damage, 0), this.health.maxHP);
        this.alterHP(this.health.currentHP);
        return this.health.currentHP;
    }

    checkDeath() {
        if (this.getHP() <= 0) {
            this.health.death.isDead = true;
        } else {
            console.log("Player has",this.getHP(),"health left!");
        }
    }

    getHP() {
        return this.health.hp;
    }
    heal(hp) {

    }
}