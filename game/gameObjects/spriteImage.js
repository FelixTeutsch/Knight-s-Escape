class SpriteImage extends GameObject {
    image;
    isLoaded = false;

    padding = 0;
    source = "";
    spriteSize = {
        width: 0,
        height: 0
    };
    spritePosition = {
        row: 0,
        col: 0,
        x: 0,
        y: 0
    }

    constructor(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight, padding) {
        super(name, x, y, width, height);

        this.padding = padding;
        this.spriteSize.width = spriteWidth;
        this.spriteSize.height = spriteHeight;
        this.spritePosition.col = col;
        this.spritePosition.row = row;
        this.spritePosition.x = (spriteWidth + padding) * (col);
        this.spritePosition.y = (spriteHeight + padding) * (row);

        this.image = new Image();
        this.image.src = src;
        this.image.addEventListener("load", () => {
            this.isLoaded = true;
            this.draw();
            console.log(`Img: ${this.image.src}, x:y ${this.spritePosition.x}:${this.spritePosition.y}, w:h ${spriteWidth}:${spriteHeight}, p: ${padding}, c:${col}`);
        });
    }

    draw() {
        if (this.isLoaded) {
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.drawImage(
                this.image,
                this.spritePosition.x, this.spritePosition.y, this.spriteSize.width, this.spriteSize.height,
                this.position.x, this.position.y, this.dimensions.height, this.dimensions.width
            );
            gameManager.canvas.drawLayer.closePath();
        }
    }
}