class Shield extends Weapon {
    constructor() {
        super("shield", 34 * 2, gameManager.canvas.canvasHTMLElement.height - 34, 34, 34, "./image/weapon/shield.png", 0, 0, 34, 34);
    }

    update() {
        player.weapon.attack.isBlocking = false;
        // reduce cooldown
        this.attack.primary.cooldown.current--;
        this.attack.bonus.cooldown.current--;

        if (this.attack.type === "primary" && this.attack.primary.cooldown.current > 0 ||
            this.attack.type === "bonus" && this.attack.bonus.cooldown.current > 0)
            return;
        if (this.attack.isAttacking) {
            // Set Animation
            this.animationDurationPerFrame = 1
            player.setCurrentAnimationByName("player_shield_" + this.attack.type + "_" + (player.movement.directionFacing >= 0 ? "right" : "left"));

            switch (this.attack.type) {
                case "primary":
                    if ((player.currentAnimationFrame - player.currentStartFrame) >= 2)
                        player.enemyList.forEach(enemy => {
                            enemy.takeDamage(this.attack.primary.damage);
                            enemy.position.x += 3 * player.movement.directionFacing;
                        });
                    break;
                case "bonus":
                    if ((player.currentAnimationFrame - player.currentStartFrame) >= 2)
                        player.weapon.attack.isBlocking = true;
                    break;
            }
            // Clear Enemy Collition List
            // player.enemyList = [];
        }
    }
}