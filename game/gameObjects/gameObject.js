class GameObject {
    name = "";
    isActive = true;
    useGravity = false;
    isFalling = false;
    isRigid = false;
    antiGravityForce = 0;
    currentGravityCollisionObject = null;
    mass = 1;
    //rotation = 0;

    position = {
        x: 20,
        y: 20
    };

    prevPosition = {
        "x": 20,
        "y": 20
    };

    boundaries = {
        getLeftBoundary: () => {
            return this.position.x + this.boundaryOffsets.left;
        },
        getRightBoundary: () => {
            return this.position.x + this.dimensions.width + this.boundaryOffsets.right;
        },
        getTopBoundary: () => {
            return this.position.y + this.boundaryOffsets.top;
        },
        getBottomBoundary: () => {
            return this.position.y + this.dimensions.height + this.boundaryOffsets.bottom;
        }
    };

    boundaryOffsets = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }

    dimensions = {
        width: 40,
        height: 40
    };

    constructor(name, x, y, width, height) {
        this.name = name;
        this.position.x = x;
        this.position.y = y;
        this.dimensions.width = width;
        this.dimensions.height = height;
        gameManager.addGameObject(this);
        //LOGGER.log(`x:y ${this.position.x}:${this.position.y}`);
    }

    storePosition() {
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
    }

    restorePosition() {
        this.position.x = this.prevPosition.x;
        this.position.y = this.prevPosition.y;
        if (this.name == "player")
            LOGGER.log("Position restored: ", this.position.x, this.position.y);
    }

    setBoundaryOffsets(left, right, top, bottom) {
        this.boundaryOffsets.left = left;
        this.boundaryOffsets.right = right;
        this.boundaryOffsets.top = top;
        this.boundaryOffsets.bottom = bottom;
    }

    addAntiGravityForce(force) {
        this.antiGravityForce += force;
    }
    getBoundaryWidth() {
        return this.dimensions.width - this.boundaryOffsets.left + this.boundaryOffsets.right;
    }
    getBoundaryHeight() {
        return this.dimensions.height - this.boundaryOffsets.top + this.boundaryOffsets.bottom;
    }

    update() {

    }

    draw() {
    }

    onCollision(otherObject) {

    }

    onMouseEvent(mouseEvent) {
        /*
            recentMouseEvent: 
            0 == hover, 
            1 == left down initial, 2 == middle down initial, 3 == right down initial, 
            4 == left down held, 5 == middle up held, 6 == right up held, 
            7 == left up, 8 == middle up, 9 == right up, 
            10 == left click, 11 == middle click, 12 == right click,
            13 == focus lost
        */
    }


}