/**
 * @class Sprite
 * @deprecated
 */
export class Sprite {
    padding = 0;
    source = "";
    size = {
        width: 0,
        height: 0
    };
    position = {
        x: 0,
        y: 0
    }

    constructor(x, y, width, height, padding, source) {
        this.size.width = width;
        this.size.height = height;
        this.position.x = x;
        this.position.y = y;
        this.padding = padding;
        this.source = source;
    }

    //get
}