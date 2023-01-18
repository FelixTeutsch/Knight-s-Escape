class Player extends SpriteAnimation {
    moveBy = {
        "left": 0,
        "top": 0
    };

    moveVelocity = 2;
    startJump = false;

    selectedWeapon = 0;

    weapons = [];

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        console.log("PlayerFigure has been created");
        this.useGravity = true;
        this.mass = .6;

        this.weapons.push(new Sword());
        this.weapons.push(new Bow());
        this.weapons.push(new Shield());
        let temp = this.weapons[this.selectedWeapon];
        temp.selectWeapon();
    }

    update() {
        this.position.x += this.moveBy.left;
        this.position.y += this.moveBy.top;
        this.checkWorldPostion();

        if (this.startJump) {
            this.addAntiGravityForce(300);
            this.startJump = false;
        }
    }

    checkWorldPostion() {
        if (this.boundaries.getBottomBoundary() <= gameManager.canvas.canvasBoundaries.top) {
            this.position.y = gameManager.canvas.canvasBoundaries.bottom;
        }
        else if (this.boundaries.getTopBoundary() >= gameManager.canvas.canvasBoundaries.bottom) {
            this.position.y = gameManager.canvas.canvasBoundaries.top - this.dimensions.height;
        }
        else if (this.boundaries.getRightBoundary() <= gameManager.canvas.canvasBoundaries.left) {
            this.position.x = gameManager.canvas.canvasBoundaries.right;
        }
        else if (this.boundaries.getLeftBoundary() >= gameManager.canvas.canvasBoundaries.right) {
            this.position.x = gameManager.canvas.canvasBoundaries.left - this.dimensions.width;
        }
    }

    onCollision(otherObject) {

    }
    /*draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "yellow";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.singlePartHeight);
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y + this.singlePartHeight + this.offset , this.dimensions.width, this.singlePartHeight);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.closePath();   
    }*/

    selectNewWeapon(newWeapon) {
        let temp = this.weapons[this.selectedWeapon];
        temp.deselectWeapon();
        this.selectedWeapon = newWeapon;

        temp = this.weapons[this.selectedWeapon];
        temp.selectWeapon();
    }



}