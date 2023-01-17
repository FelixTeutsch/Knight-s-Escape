class Obstacle extends SpriteImage {
    constructor(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight, padding) {
        super(name, x, y, width, height, src);
        this.isRigid = true;
    }

    onCollision(otherObject) {
        if (otherObject.name == "player" || otherObject.name == "enemy") {
            otherObject.restorePosition();
        }
    }
}