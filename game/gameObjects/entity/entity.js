class Entity extends SpriteAnimation {
    move = {
        x: 1,
        y: 0,
        velocity: 1
    };

    health = {
        maxHP: 0,
        currentHP: 0
    };

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
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
}