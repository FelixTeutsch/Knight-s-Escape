class Sword extends Weapon {
    constructor() {
        super("sword", 2, 2, 34, 34, "./image/weapon/sword.png", 0, 0, 34, 34);
        this.attack.primary.damage = 1;
        this.attack.bonus.damage = 2;
    }
    update() {
        // reduce cooldown
        this.attack.primary.cooldown.current--;
        this.attack.bonus.cooldown.current--;

        if (this.attack.type === "primary" && this.attack.primary.cooldown.current > 0 ||
            this.attack.type === "bonus" && this.attack.bonus.cooldown.current > 0)
            return;
        if (this.attack.isAttacking) {
            // Set Animation
            this.animationDurationPerFrame = 1
            player.setCurrentAnimationByName("player_sword_" + this.attack.type + "_" + (player.movement.directionFacing >= 0 ? "right" : "left"));

            switch (this.attack.type) {
                case "primary":
                    if ((player.currentAnimationFrame - player.currentStartFrame) == 3)
                        player.enemyList.forEach(enemy => {
                            enemy.takeDamage(this.attack.primary.damage);
                            enemy.position.x += 1 * player.movement.directionFacing;
                        });
                    break;
                case "bonus":
                    if ((player.currentAnimationFrame - player.currentStartFrame) == 3)
                        player.enemyList.forEach(enemy => {
                            enemy.takeDamage(this.attack.primary.damage);
                            enemy.position.x += 3 * player.movement.directionFacing;
                        });
                    break;
            }
            // Clear Enemy Collition List
            // player.enemyList = [];
        }
    }
}