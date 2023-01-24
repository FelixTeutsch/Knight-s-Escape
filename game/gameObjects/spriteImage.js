class SpriteImage extends GameObject {
    image;
    isLoaded = false;

    // source = "";
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

    constructor(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight) {
        super(name, x, y, width, height);
        this.spriteSize.width = spriteWidth;
        this.spriteSize.height = spriteHeight;
        this.spritePosition.col = col;
        this.spritePosition.row = row;
        this.spritePosition.x = spriteWidth * col;
        this.spritePosition.y = spriteHeight * row;
        this.image = new Image();
        this.image.src = src;
        this.image.addEventListener("load", () => {
            this.isLoaded = true;
            this.draw();
            //LOGGER.log(`Img: ${this.image.src}, x:y ${this.spritePosition.x}:${this.spritePosition.y}, w:h ${spriteWidth}:${spriteHeight}, p: ${padding}, c:${col}`);
        });
    }

    draw() {
        if (this.isLoaded) {
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.drawImage(
                this.image,
                this.spritePosition.x, this.spritePosition.y, this.spriteSize.width, this.spriteSize.height,
                this.position.x, this.position.y, this.dimensions.width, this.dimensions.height
            );
            gameManager.canvas.drawLayer.closePath();
            //LOGGER.log("drawn");
        }
    }
    changeImage(row, col) {
        /*if (!(src === ""))
            this.image.src = src;*/

        this.spritePosition.col = col;
        this.spritePosition.row = row;
        this.spritePosition.x = (this.spriteSize.width) * (col);
        this.spritePosition.y = (this.spriteSize.height) * (row);
    }
}