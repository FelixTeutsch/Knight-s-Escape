class Shield extends Weapon {
    constructor() {
        super("shield", 1 + 35 * 2, gameManager.canvas.canvasHTMLElement.height - 35, 34, 34, "./image/weapon/shield.png", 0, 0, 34, 34);
    }
}