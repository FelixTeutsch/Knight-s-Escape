class Obstacle extends ImageObject {
    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
        this.isRigid = true;
    }

    onCollision(otherObject) {
        if (otherObject.name == "player" || otherObject.name == "enemy") {
            otherObject.restorePosition();
        }
    }
}