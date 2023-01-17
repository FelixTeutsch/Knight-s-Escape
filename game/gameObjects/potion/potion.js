class Potion extends ImageObject {
    #potion = {
        type: "",
        strength: 0
    };
    constructor(name, x, y, width, height, type, strength) {
        super(name, x, y, width, height);
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