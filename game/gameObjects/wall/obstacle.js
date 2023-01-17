class Obstacle extends ImageObject {
    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        this.isRigid = true;
    }

    onCollision(otherObject) {
        if (otherObject.name == "player" || otherObject.name == "enemy") {
            otherObject.restorePosition();
        }
    }
}