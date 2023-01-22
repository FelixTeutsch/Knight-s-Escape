class Bow extends Weapon {
    constructor() {
        super("bow", 1 + 35, gameManager.canvas.canvasHTMLElement.height - 35, 34, 34, "./image/weapon/bow.png", 0, 0, 34, 34);
    }
}