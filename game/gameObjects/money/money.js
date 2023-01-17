class Money extends SpriteAnimation {
    #money = {
        type: "",
        value: 0
    };
    constructor(name, x, y, width, height, type, value) {
        this.#money.type = type; // ruby or coin
        this.#money.value = value; // ruby: 10, coin 1 (Can be randomised)
        super(name, x, y, width, height);
    }

    onCollision(otherObject) {
        if (otherObject.name == "player") {
            this.isActive = false;
            // TODO: Add Money to Player
        }
    }
}