class Money extends SpriteImage {
    #money = {
        type: "",
        value: 0
    };
    constructor(name, x, y, width, height, type, value) {
        let src = "./image/money/" + type + ".png";
        super(name, x, y, width, height, src, 0, 0, 16, 16);
        this.#money.type = type; // ruby or coin
        this.#money.value = value; // ruby: 10/15, coin 1/5 (randomised)
    }

    onCollision(otherObject) {
        if (otherObject.name == "player") {
            this.isActive = false;
            LOGGER.log("Player just collected a",this.#money.type,"for",this.#money.value);
            increaseScore(this.#money.value);
            // TODO: Add Money to Player
        }
    }
}