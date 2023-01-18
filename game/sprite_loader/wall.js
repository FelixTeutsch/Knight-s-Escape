class WallSprite {
    source = "./image/wall/wall.png";
    padding = 1;
    elements = {

        "═": {
            spriteName: "vertical_connector",
            position: {
                x: 0,
                y: 0
            }
        },

        "║": {
            spriteName: "horizontal_connector",
            position: {
                x: 1,
                y: 0
            }
        },

        "╬": {
            spriteName: "four_way_connector",
            position: {
                x: 2,
                y: 0
            }
        },

        "□": {
            spriteName: "single_block",
            position: {
                x: 3,
                y: 0
            }
        },


        "┌": {
            spriteName: "top_left_corner_inside",
            position: {
                x: 0,
                y: 1
            }
        },

        "┐": {
            spriteName: "top_right_corner_inside",
            position: {
                x: 1,
                y: 1
            }
        },

        "┘": {
            spriteName: "bottom_left_corner_inside",
            position: {
                x: 2,
                y: 1
            }
        },

        "└": {
            spriteName: "bottom_right_corner_inside",
            position: {
                x: 3,
                y: 1
            }
        },

        "┌": {
            spriteName: "top_left_corner_double",
            position: {
                x: 0,
                y: 2
            }
        },

        "┐": {
            spriteName: "top_right_corner_double",
            position: {
                x: 1,
                y: 2
            }
        },

        "┘": {
            spriteName: "bottom_left_corner_double",
            position: {
                x: 2,
                y: 2
            }
        },

        "└": {
            spriteName: "bottom_right_corner_double",
            position: {
                x: 3,
                y: 2
            }
        },

        "<": {
            spriteName: "left_end_double",
            position: {
                x: 0,
                y: 3
            }
        },

        ">": {
            spriteName: "right_end_double",
            position: {
                x: 1,
                y: 3
            }
        },

        "v": {
            spriteName: "bottom_end_double",
            position: {
                x: 2,
                y: 3
            }
        },

        "^": {
            spriteName: "top_end_double",
            position: {
                x: 3,
                y: 3
            }
        },

        "┴": {
            spriteName: "top_tripple_connector",
            position: {
                x: 0,
                y: 4
            }
        },

        "┬": {
            spriteName: "bottom_tripple_connector",
            position: {
                x: 1,
                y: 4
            }
        },

        "┤": {
            spriteName: "left_tripple_connector",
            position: {
                x: 2,
                y: 4
            }
        },

        "├": {
            spriteName: "right_tripple_connector",
            position: {
                x: 3,
                y: 4
            }
        },

        "t": {
            spriteName: "top_connector",
            position: {
                x: 0,
                y: 5
            }
        },

        "b": {
            spriteName: "bottom_connector",
            position: {
                x: 1,
                y: 5
            }
        },

        "r": {
            spriteName: "right_connector",
            position: {
                x: 2,
                y: 5
            }
        },

        "l": {
            spriteName: "left_connector",
            position: {
                x: 3,
                y: 5
            }
        },

        "■": {
            spriteName: "center_0",
            position: {
                x: 0,
                y: 6
            }
        },

        "■": {
            spriteName: "center_1",
            position: {
                x: 1,
                y: 6
            }
        },

        "■": {
            spriteName: "center_2",
            position: {
                x: 2,
                y: 6
            }
        },


        "0": {
            spriteName: "top_left_corner_outside",
            position: {
                x: 1,
                y: 7
            }
        },

        "1": {
            spriteName: "top_right_corner_outside",
            position: {
                x: 1,
                y: 7
            }
        },

        "2": {
            spriteName: "bottom_left_corner_outside",
            position: {
                x: 2,
                y: 7
            }
        },

        "3": {
            spriteName: "bottom_right_corner_outside",
            position: {
                x: 3,
                y: 7
            }
        }

    }

    size = {
        width: 16,
        height: 16
    }

    createdWalls = [];
    constructor() {

    }
    createWall(wallKey, x, y) {
        if (wallKey in this.elements) {
            let newWall = new Wall(this.elements[wallKey].spriteName,
                x, y, this.size.width, this.size.height, this.source,
                this.elements[wallKey].position.x, this.elements[wallKey].position.y, 16, 16, 1);
            //console.log(this.elements[wallKey].position.y);
            this.createdWalls.push([newWall]);
            return newWall;
        }
        return false;
    }
    getWidth() {
        return this.size.width;
    }
    getHeight() {
        return this.size.height;
    }
}