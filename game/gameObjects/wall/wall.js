class Wall extends Obstacle {
    #wallKey = "";
    constructor(name, x, y, width, height, wallKey) {
        super(name, x, y, width, height);
        this.#wallKey = wallKey;
    }

    getWallKey() {
        return this.#wallKey;
    }
}