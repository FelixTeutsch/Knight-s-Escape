class Hp extends SpriteImage {
    constructor(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight) {
        super(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight);
    }
    fullHeart() {
        this.changeImage(0, 0);
    }
    halfHeart() {
        this.changeImage(0, 1);
    }
    emptyHeart() {
        this.changeImage(0, 2);
    }
}