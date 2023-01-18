class SpriteLoader {
    #spriteFiles = {};
    wallHandeler = new WallHandeler();

    #wallKey = {};
    #playerKey = "p";
    #enemyKey = "e";
    #coinKey = "c";
    #rubyKey = "x";
    levelMap = [];

    #elementSize = 16;


    constructor(levelMap) {
        this.levelMap = levelMap;
    }

    loadKeys() {
        // Load wall keys
        this.#wallKey = this.wallHandeler.getKeys();
        console.log(this.#wallKey);
    }

    createLevel() {
        for (let y = 0; y < this.levelMap.length; y++) {
            for (let x = 0; x < this.levelMap[0].length; x++) {
                let currentKey = this.levelMap[y][x];
                if (this.#wallKey.includes(currentKey)) {
                    this.wallHandeler.createWall(currentKey, x * this.wallHandeler.getWidth(), y * this.wallHandeler.getHeight());

                } else if (currentKey === this.#playerKey) {
                    player = new Player("player", x * this.#elementSize, y * this.#elementSize, 32, 32, "./image/entity/player/player.png");

                } else if (currentKey === this.#enemyKey) {
                    new Enemy("enemy", x * this.#elementSize, y * this.#elementSize, this.#elementSize, this.#elementSize, currentKey, "./image/enemy/enemy.png");
                } else if (currentKey === this.#coinKey) {
                    new Money("coin", x * this.#elementSize, y * this.#elementSize, 16, 16, "coin", this.getRandomInt(1,5)); //assign random coin value
                }else if (currentKey === this.#rubyKey) {
                    new Money("coin", x * this.#elementSize, y * this.#elementSize, 16, 16, "ruby", this.getRandomInt(10,15)); //assign random coin value
                }
            }
        }
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getSprite(sprite) {

    }

    setLevelMap(levelMap) {
        this.levelMap = levelMap;
    }
}