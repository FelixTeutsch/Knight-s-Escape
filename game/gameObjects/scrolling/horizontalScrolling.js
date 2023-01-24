class HorizontalScrolling extends GameObject {

    gameContainer;
    minMarginLeft;
    // canvasStyle;
    currentMarginLeft;
    canvasToMove;
    backgroundToMove;

    constructor(name) {
        super(name, 0, 0, 16, gameManager.canvas.canvasHTMLElement.height);
        this.gameContainer = document.getElementById("gameView");
        let currentGameContainerWidth = parseInt(this.gameContainer.clientWidth);
        let currentCanvasWidth = gameManager.canvas.canvasHTMLElement.width;

        this.canvasToMove = document.getElementById("canvas");
        this.backgroundToMove = document.getElementById("background");

        // this.canvasStyle = this.canvasToMove.currentStyle || window.getComputedStyle(this.canvasToMove);
        this.minMarginLeft = - canvasSize.width + (currentGameContainerWidth / 4) * 2.5; // fix this value
        console.log("Canvas Size Width:",this.minMarginLeft)
        if (this.name === "moveLeft")
            this.position.x = currentGameContainerWidth / (4 * 2.5);
        else if (name === "moveRight")
            this.position.x = currentGameContainerWidth * 3 / (4 * 2.5);
        this.currentMarginLeft = 0;
    }

    onCollision(otherObject) {
        if (otherObject.name == "player") {

            let c = document.getElementById("canvas");
            let shouldMoveLevel = false;
            if (this.name == "moveRight" && otherObject.move.x > 0 && this.currentMarginLeft /*- otherObject.move.x * 2.5*/ > this.minMarginLeft) {
                shouldMoveLevel = true;
            }
            else if (this.name == "moveLeft" && otherObject.move.x < 0 && this.currentMarginLeft < 0) {
                shouldMoveLevel = true;
            }
            if (shouldMoveLevel) {
                this.currentMarginLeft -= otherObject.move.x * 2.5;
                moveLeft.currentMarginLeft = moveRight.currentMarginLeft = this.currentMarginLeft;
                // document.getElementById("canvas").style.marginLeft = this.currentMarginLeft + "px";
                this.canvasToMove.style.marginLeft = this.currentMarginLeft + "px";
                this.backgroundToMove.style.marginLeft = this.currentMarginLeft / 2.5 + "px";
                moveLeft.position.x += otherObject.move.x * 1;
                moveRight.position.x += otherObject.move.x * 1;

                player.weapon["weaponList"].forEach(weapon => weapon.position.x += otherObject.move.x);
                player.health.heartSprite.forEach(heart => heart.position.x += otherObject.move.x);
                player.health.bonusHeartSprite.forEach(heart => heart.position.x += otherObject.move.x);
            }
        }
    }
    draw() {
        return;
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "black";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.closePath();
    }
} 3