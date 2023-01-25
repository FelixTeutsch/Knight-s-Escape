class SpriteLoader {
    #spriteFiles = {};
    wallHandeler = new WallHandeler();

    #wallKey = {};
    #playerKey = "p";
    #enemyKey = "e";
    #coinKey = "c";
    #rubyKey = "x";
    levelMap = [];
    #exitKey = "g";

    #elementSize = 16;


    constructor(levelMap) {
        this.levelMap = levelMap;
        this.loadKeys();
        this.createLevel();
    }

    loadKeys() {
        // Load wall keys
        this.#wallKey = this.wallHandeler.getKeys();
        LOGGER.log(this.#wallKey);
    }

    createLevel() {
        let cv = document.getElementById("canvas");
        let bg = document.getElementById("background");
        cv.width = this.levelMap[0].length * this.#elementSize;
        cv.height = this.levelMap.length * this.#elementSize;
        // console.log(cv.width);
        cv.style.width = this.levelMap[0].length * this.#elementSize * 2.5 + "px";
        cv.style.height = this.levelMap.length * this.#elementSize * 2.5 + "px";
        bg.style.width = this.levelMap[0].length * this.#elementSize * 2.5 + "px";
        bg.style.height = this.levelMap.length * this.#elementSize * 2.5 + "px";

        canvasSize.width = this.levelMap[0].length * this.#elementSize * 2.5;
        canvasSize.height = this.levelMap.length * this.#elementSize * 2.5;

        let playerPosition = {
            x: 0,
            y: 0
        };
        moveLeft = new HorizontalScrolling("moveLeft");
        moveRight = new HorizontalScrolling("moveRight");


        for (let y = 0; y < this.levelMap.length; y++) {
            for (let x = 0; x < this.levelMap[0].length; x++) {
                let currentKey = this.levelMap[y][x];
                if (this.#wallKey.includes(currentKey)) {
                    this.wallHandeler.createWall(currentKey, x * this.wallHandeler.getWidth(), y * this.wallHandeler.getHeight());

                } else
                    switch (currentKey) {
                        case this.#playerKey:
                            playerPosition.x = x;
                            playerPosition.y = y;
                            break;
                        case this.#enemyKey:
                            enemy = new Enemy("enemy", x * this.#elementSize, y * this.#elementSize, 16, 17);
                            // new Enemy("enemy", x * this.#elementSize, y * this.#elementSize, this.#elementSize, this.#elementSize, currentKey, "./image/enemy/enemy.png");
                            break;
                        case this.#coinKey:
                            new Money("coin", x * this.#elementSize, y * this.#elementSize, 16, 16, "coin", this.getRandomInt(1, 5)); //assign random coin value
                            break;
                        case this.#rubyKey:
                            new Money("coin", x * this.#elementSize, y * this.#elementSize, 16, 16, "ruby", this.getRandomInt(10, 15)); //assign random coin value
                            break;
                        case this.#exitKey:
                            exit = new Exit(currentKey, x * this.wallHandeler.getWidth(), y * this.wallHandeler.getHeight());
                            break;
                    }
            }
        }

        // Draw player last to ensure that he is always drawn on top of things
        player = new Player("player", playerPosition.x * this.#elementSize, playerPosition.y * this.#elementSize, 51, 32, "./image/entity/player/player.png");

    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getSprite(sprite) {

    }

    setLevelMap(levelMap) {
        this.levelMap = levelMap;
        this.createLevel();
    }
}