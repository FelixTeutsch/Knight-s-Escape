class Obstacle extends SpriteImage {
    constructor(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight) {
        super(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight);
        this.isRigid = true;
    }

    onCollision(otherObject) {
        if (otherObject.name == "player") {
            if (player.movement.dashCooldown < 0)
                otherObject.restorePosition();
            else {
                player.position.x += player.movement.directionFacing * 16;
                //console.log("Dashed through wall!", player.position.x);
            }
        } else if (otherObject.name == "enemy") {
            otherObject.restorePosition();
        }
    }
}