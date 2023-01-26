class Weapon extends SpriteImage {
    attack = {
        isAttacking: false,
        type: "", // "bonus", "primary"
        primary: {
            damage: 0,
            cooldown: {
                current: 0,
                max: 0
            }
        },
        bonus: {
            damage: 0,
            cooldown: {
                current: 0,
                max: 0
            }
        }
    }

    selected = false;
    inUse = false;

    constructor(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight) {
        super(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight);
    }
    selectWeapon() {
        if (this.selected)
            return false;
        this.selected = true;
        this.changeImage(0, 1);

    }
    deselectWeapon() {
        if (!this.selected)
            return false;
        this.selected = false;
        this.changeImage(0, 0);
    }

    primaryAttack() {
        if (this.attack.isAttacking)
            return false;
        this.attack.type = "primary";
        return this.attack.isAttacking = true;
    }

    bonusAttack() {
        if (this.attack.isAttacking)
            return false;
        this.attack.type = "bonus";
        return this.attack.isAttacking = true;
    }

    endAttack() {
        this.attack.isAttacking = false;
        if (this.attack.type == "primary") {
            this.attack.primary.cooldown.current = this.attack.primary.cooldown.max;
        } else
            this.attack.bonus.cooldown.current = this.attack.bonus.cooldown.max;
    }
    doDamage() {
        return this.attack.isAttacking ? (this.attack.type === "primary" ? this.attack.primary.damage : this.attack.bonus.damage) : 0; // Return Damage
    }

}