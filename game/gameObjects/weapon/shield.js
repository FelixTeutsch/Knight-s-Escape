class Shield extends Weapon {
    constructor() {
        super("shield", 34 * 2, gameManager.canvas.canvasHTMLElement.height - 34, 34, 34, "./image/weapon/shield.png", 0, 0, 34, 34);
    }
}