class Score extends GameObject {
    image = new Image;
    isLoaded = false;
    constructor() {
        super("score", Math.floor(document.getElementById("gameView").clientWidth / 2.5 - 2 - 36), 3, 36, 19);
        this.image.src = "./image/score/score.png";
        this.image.addEventListener("load", () => {
            this.isLoaded = true;
        });
    }
    draw() {
        if (this.isLoaded) {
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.drawImage(this.image,
                0, 0,
                this.dimensions.width, this.dimensions.height,
                this.position.x, this.position.y, this.dimensions.width, this.dimensions.height
            );
            gameManager.canvas.drawLayer.strokeStyle = "#fbf236";
            if (score < 10) {
                gameManager.canvas.drawLayer.font = "10px serif";
                gameManager.canvas.drawLayer.strokeText(score, this.position.x + 22, this.position.y + 13);
            } else if (score < 100) {
                gameManager.canvas.drawLayer.font = "10px serif";
                gameManager.canvas.drawLayer.strokeText(score, this.position.x + 20, this.position.y + 13);
            } else {
                gameManager.canvas.drawLayer.font = "8px serif";
                gameManager.canvas.drawLayer.strokeText(score, this.position.x + 18, this.position.y + 12);
            }
            gameManager.canvas.drawLayer.fill();
            gameManager.canvas.drawLayer.closePath();
        }
    }
}