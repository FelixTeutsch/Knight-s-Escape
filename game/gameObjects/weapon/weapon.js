class Weapon extends SpriteImage {
    primaryAttack = {
        damage: 0,
        cooldown: 0,
        currentCooldown: 0
    }

    bonusAttack = {
        damage: 0,
        cooldown: 0,
        currentCooldown: 0
    }
    selected = false;
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
}