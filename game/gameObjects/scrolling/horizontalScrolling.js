class HorizontalScrolling extends GameObject {

    gameContainer;
    minMarginLeft;
    canvasStyle;
    currentMarginLeft;

    constructor(name) {
        super(name, 0, 0, 16,  gameManager.canvas.canvasHTMLElement.height);
        this.gameContainer = document.getElementById("gameView");
        let currentGameContainerWidth = parseInt(this.gameContainer.clientWidth);
        let currentCanvasWidth = gameManager.canvas.canvasHTMLElement.width;
        this.minMarginLeft = -currentCanvasWidth + (currentGameContainerWidth / (4)); // fix this value
        if (this.name === "moveLeft")
            this.position.x = currentGameContainerWidth / (4 * 2.5);
        else if (name === "moveRight")
            this.position.x = currentGameContainerWidth * 3 / (4 * 2.5);
        this.currentMarginLeft = 0;
    }

    onCollision(otherObject) {
        if (otherObject.name == "player") {

            let shouldMoveLevel = false;
            let c = document.getElementById("canvas");
            this.canvasStyle = gameManager.canvas.currentStyle || window.getComputedStyle(c);
            if (this.name == "moveRight" && otherObject.move.x > 0 && this.currentMarginLeft - otherObject.move.x * 2.5 > this.minMarginLeft) {
                shouldMoveLevel = true;
            }
            else if (this.name == "moveLeft" && otherObject.move.x < 0 && this.currentMarginLeft < 0) {
                shouldMoveLevel = true;
            }
            if (shouldMoveLevel) {
                this.currentMarginLeft -= otherObject.move.x * 2.5;
                moveLeft.currentMarginLeft = moveRight.currentMarginLeft = this.currentMarginLeft;
                document.getElementById("canvas").style.marginLeft = this.currentMarginLeft + "px";
                moveLeft.position.x += otherObject.move.x;
                moveRight.position.x += otherObject.move.x;

                player.weapon["weaponList"].forEach(weapon => weapon.position.x += otherObject.move.x);
                player.health.heartSprite.forEach(heart => heart.position.x += otherObject.move.x);
                player.health.bonusHeartSprite.forEach(heart => heart.position.x += otherObject.move.x);
            }
        }
    }
    draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "black";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.closePath();
    }
}