class HorizontalScrolling extends GameObject {

    gameContainer;
    minMarginLeft;
    canvasStyle;


    constructor(name, x, y, width, height, gameContainerId) {
        super(name, x, y, width, height);
        this.gameContainer = document.getElementById(gameContainerId);
        let currentGameContainerWidth = parseInt(this.gameContainer.clientWidth);
        let currentCanvasWidth = gameManager.canvas.canvasHTMLElement.width;
        this.minMarginLeft = currentGameContainerWidth - currentCanvasWidth;
        console.log(this.minMarginLeft, currentGameContainerWidth, currentCanvasWidth);
    }

    onCollision(otherObject) {
        let currentGameContainerMarginLeft = parseInt(this.gameContainer.style.marginLeft);
        let shouldMoveLevel = false;
        let c = document.getElementById("canvas");
        this.canvasStyle = gameManager.canvas.currentStyle || window.getComputedStyle(gameManager.canvas.canvasHTMLElement);
        console.log(this.canvasStyle.marginLeft);
        if (this.name == "moveRight" && otherObject.name == "player" && otherObject.move.x > 0 /*&& currentGameContainerMarginLeft > this.minMarginLeft*/) {
            console.log("COLLITION");
            shouldMoveLevel = true;
        }
        else if (this.name == "moveLeft" && otherObject.name == "player" && otherObject.move.x < 0 && this.canvasStyle.marginLeft < 0) {
            shouldMoveLevel = true;
        }

        if (shouldMoveLevel) {
            let text = this.canvasStyle.marginLeft - otherObject.move.x + "px";
            c.style.marginLeft = text;
            //this.gameContainer.style.width = otherObject.move.x + "px";
            moveLeft.position.x += otherObject.move.x;
            moveRight.position.x += otherObject.move.x;

            player.weapon["weaponList"].forEach(weapon => weapon.position.x += otherObject.move.x);
            player.health.heartSprite.forEach(heart => heart.position.x += otherObject.move.x);
            player.health.bonusHeartSprite.forEach(heart => heart.position.x += otherObject.move.x);
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