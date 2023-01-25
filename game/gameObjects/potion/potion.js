class Potion extends SpriteImage {
    #potion = {
        type: "",
        strength: 0
    };
    constructor(name, x, y, type, strength) {
        super(name, x+2, y+4, 12, 12, "./image/potion/" + type + "Potion.png", 0, 0, 24, 24);
        this.#potion.type = type;
        this.#potion.strength = strength;
    }
    getType() {
        return this.#potion.type;
    }
    getStrength() {
        return this.#potion.strength;
    }
}