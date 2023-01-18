class SpriteLoader {
    #spriteFiles = {};

    #wall = {
        "┌": "top_left_corner_inside",
        "┐": "top_right_corner_inside",
        "┘": "bottom_left_corner_inside",
        "└": "bottom_right_corner_inside",
        "┌": "top_left_corner_double",
        "┐": "top_right_corner_double",
        "┘": "bottom_left_corner_double",
        "└": "bottom_right_corner_double",
        "<": "left_end_double",
        ">": "right_end_double",
        "v": "bottom_end_double",
        "^": "top_end_double",
        "┴": "top_tripple_connector",
        "┬": "bottom_tripple_connector",
        "┤": "left_tripple_connector",
        "├": "right_tripple_connector",
        "t": "top_connector",
        "b": "bottom_connector",
        "r": "right_connector",
        "l": "left_connector",
        "■": "center_1",
        "■": "center_2",
        "■": "center_3",
        "═": "vertical_connector",
        "║": "horizontal_connector",
        "╬": "four_way_connector",
        "□": "single_block",
        "1": "top_left_corner_outside",
        "2": "top_right_corner_outside",
        "3": "bottom_left_corner_outside",
        "4": "bottom_right_corner_outside",
    }
    #playerKey = "p";
    #enemyKey = "e";
    #coinKey = "c";
    #rubyKey = "r";
    levelMap = [];

    #elementSize = 18;

    wallSprite = new WallSprite();

    constructor(levelMap) {
        this.levelMap = levelMap;
    }

    createLevel() {
        for (let y = 0; y < this.levelMap.length; y++) {
            for (let x = 0; x < this.levelMap[0].length; x++) {
                let currentKey = this.levelMap[y][x];
                if (currentKey in this.#wall) {
                    this.wallSprite.createWall(currentKey, x*this.wallSprite.getWidth(), y*this.wallSprite.getHeight());
                } else if (currentKey === this.#playerKey) {



                    player = new Player("player", x * this.#elementSize, y * this.#elementSize, 32, 32, "./image/entity/player/player.png");
                } else if (currentKey === this.#enemyKey) {
                    new Enemy("enemy", x * this.#elementSize, y * this.#elementSize, this.#elementSize, this.#elementSize, currentKey, "./image/enemy/enemy.png");
                }
            }
        }
    }

    getSprite(sprite) {

    }

    setLevelMap(levelMap) {
        this.levelMap = levelMap;
    }
}