class Enemy extends ImageObject {
    changeMoveDirectionPossibility = 1;
    changeMoveDirectionStep = 0.00001;
    moveBy = {
        "x": 1,
        "y": 0
    };

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        console.log("PlayerFigure has been created");
        this.useGravity = true;
        this.mass = .6;
    }

    update() {
      let result = Math.random();

      if (result <= this.changeMoveDirectionPossibility) {
        //change direction
        this.moveBy.x *= -1;
        this.moveBy.y *= -1;

        if (this.moveBy.x == 1) {
            this.setCurrentAnimationByName("walk_right");
        }
        else {
            this.setCurrentAnimationByName("walk_left");
        }

        this.changeMoveDirectionPossibility = 0.00001;
      }
      else {
        this.changeMoveDirectionPossibility += this.changeMoveDirectionStep;
      }
      this.position.x += this.moveBy.x;
      this.position.y += this.moveBy.y;
    }

    onCollision(otherObject) {
        if(otherObject.name == "obstacle") {
            this.moveBy.x *= -1;
            this.moveBy.y *= -1;
        }
    }

}