class Wall extends Obstacle {
    #wallKey = "";
    constructor(name, x, y, width, height, wallKey, src) {
        super(name, x, y, width, height, src);
        this.#wallKey = wallKey;
    }

    getWallKey() {
        return this.#wallKey;
    }
}