class VerticalScrolling extends GameObject {

    gameContainer;
    minMarginBottom;
    canvasStyle;
    currentMarginBottom;

    constructor(name) {
        super(name, 0, 0, gameManager.canvas.canvasHTMLElement.width, 16);
        this.gameContainer = document.getElementById("gameView");
        let currentGameContainerHeight = parseInt(this.gameContainer.clientHeight);
        let currentCanvasHeight = gameManager.canvas.canvasHTMLElement.height;
        this.minMarginBottom = -currentCanvasHeight + (currentGameContainerHeight / (4)); // fix this value
        console.log(this.minMarginBottom)
        if (name === "moveDown")
            this.position.y = currentCanvasHeight - currentGameContainerHeight / (4 * 2.5);
        else if (name === "moveUp")
            this.position.y = currentCanvasHeight - currentGameContainerHeight * 3 / (4 * 2.5);
        this.currentMarginBottom = 0;
    }

    onCollision(otherObject) {
        if (otherObject.name == "player") {

            let shouldMoveLevel = false;
            let c = document.getElementById("canvas");
            this.canvasStyle = gameManager.canvas.currentStyle || window.getComputedStyle(c);
            if (this.name == "moveUp" && otherObject.move.y > 0 && this.currentMarginBottom - otherObject.move.y * 2.5 > this.minMarginBottom) {
                shouldMoveLevel = true;
            }
            else if (this.name == "moveDown" && otherObject.move.y < 0 && this.currentMarginBottom < 0) {
                shouldMoveLevel = true;
            }
            if (shouldMoveLevel) {
                this.currentMarginBottom -= otherObject.move.y * 2.5;
                moveUp.currentMarginBottom = moveDown.currentMarginBottom = this.currentMarginBottom;
                document.getElementById("canvas").style.marginBottom = this.currentMarginBottom + "px";
                moveUp.position.y += otherObject.move.y;
                moveDown.position.y += otherObject.move.y;

                player.weapon["weaponList"].forEach(weapon => weapon.position.y += otherObject.move.y);
                player.health.heartSprite.forEach(heart => heart.position.y += otherObject.move.y);
                player.health.bonusHeartSprite.forEach(heart => heart.position.y += otherObject.move.y);
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