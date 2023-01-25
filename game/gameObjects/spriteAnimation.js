class SpriteAnimation extends GameObject {
    image;
    animations = {};
    columns = 0;
    rows = 0;
    currentSourceX = 0;
    currentSourceY = 0;
    currentStartFrame = 10;
    currentEndFrame = 10;
    currentAnimationFrame = 10;
    isLoaded = false;
    animationDurationPerFrame = 5;
    currentAnimationFrameDuration = 0;
    currentAnimation = "";

    entityHP = {
        show: false,
        max: 0,
        current: 0,

        hpWidth: this.dimensions.width * .75,
        hpStart: this.dimensions.width * .25,
        currentHpWidth: 0
    };

    drawPlayerSize = true;
    drawBoundingBox = true;

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height);
        this.image = new Image();
        this.image.src = src;
        LOGGER.log(width, height);
        this.image.addEventListener("load", () => {
            this.isLoaded = true;
            LOGGER.log("Is loaded:" + this.image.src)
            this.columns = this.image.naturalWidth / this.dimensions.width;
            this.rows = this.image.naturalHeight / this.dimensions.height;
            LOGGER.log("row:", this.rows, "col:", this.columns);
        });

    }

    draw() {
        gameManager.canvas.drawLayer.save();
        gameManager.canvas.drawLayer.globalAlpha = 1;

        if (this.drawPlayerSize) {
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.strokeStyle = "white";
            gameManager.canvas.drawLayer.lineWidth = 1;
            gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();
        }
        if (this.drawBoundingBox) {
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.strokeStyle = "red";
            gameManager.canvas.drawLayer.lineWidth = 1;
            gameManager.canvas.drawLayer.rect(
                this.boundaries.getLeftBoundary(), this.boundaries.getTopBoundary(),
                this.getBoundaryWidth(),
                this.getBoundaryHeight());
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();
        }
        if (this.entityHP.show) {
            // Draw current HP
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.moveTo(this.position.x + this.entityHP.hpStart / 2, this.position.y - 3);
            gameManager.canvas.drawLayer.strokeStyle = "tomato";
            gameManager.canvas.drawLayer.lineTo(this.position.x + this.entityHP.hpStart / 2 + this.entityHP.currentHpWidth, this.position.y - 3);
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();

            // Draw Missing HP
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.moveTo(this.position.x + this.entityHP.hpStart / 2 + this.entityHP.currentHpWidth, this.position.y - 3);
            gameManager.canvas.drawLayer.strokeStyle = "black";
            gameManager.canvas.drawLayer.lineTo(this.position.x + this.entityHP.hpStart / 2 + this.entityHP.hpWidth, this.position.y - 3);
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();
            
        }
        gameManager.canvas.drawLayer.restore();

        if (this.isLoaded) {
            this.changeFrameOfCurrentAnimation();
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.drawImage(
                this.image,
                this.currentSourceX, this.currentSourceY, this.dimensions.width, this.dimensions.height,
                this.position.x, this.position.y, this.dimensions.width, this.dimensions.height
            );
            gameManager.canvas.drawLayer.closePath();
        }
    }

    setCurrentAnimation(startFrame, endFrame) {
        this.currentStartFrame = startFrame;
        this.currentEndFrame = endFrame;
        this.currentAnimationFrame = startFrame;
    }

    changeFrameOfCurrentAnimation() {

        this.currentAnimationFrameDuration++;
        if (this.currentAnimationFrameDuration < this.animationDurationPerFrame) {
            return;
        }
        this.currentAnimationFrameDuration = 0;
        if (this.currentAnimationFrame > this.currentEndFrame) {
            this.currentAnimationFrame = this.currentStartFrame;
        }
        let currentRow = Math.floor(this.currentAnimationFrame / this.columns);
        let currentColumn = this.currentAnimationFrame % this.columns;
        this.currentSourceY = currentRow * this.dimensions.height;
        this.currentSourceX = currentColumn * this.dimensions.width;
        this.currentAnimationFrame++;
    }

    addAnimationInformation(name, startFrame, endFrame) {
        let animationInformation = {
            "startFrame": startFrame,
            "endFrame": endFrame
        }

        this.animations[name] = animationInformation;

        // if I now call 
        // addAnimationInformation("walkAnimation", 0, 10);
        // somewhere in my Code, then the object animations would be like:
        // {
        //    "walkAnimation": {
        //          "startFrame": 0,
        //          "endFrame": 10,
        //     }
        // }
        // if I now call ADDITIONALLY
        // addAnimationInformation("danceAnimation", 11, 20);
        // somewhere in my Code, then the object animations would be like:
        // {
        //    "walkAnimation": {
        //          "startFrame": 0,
        //          "endFrame": 10,
        //     },
        //     "danceAnimation": {
        //          "startFrame": 11
        //          "endFrame": 20,
        //     }
        // }
    }

    displayHP(maxHP, currentHp) {
        this.entityHP.show = true;
        this.entityHP.max = maxHP;
        this.alterHP(currentHp);
    }
    alterHP(newHP) {
        this.entityHP.current = newHP;
        this.entityHP.currentHpWidth = this.entityHP.hpWidth / this.entityHP.max * this.entityHP.current;
    }

    setCurrentAnimationByName(name) {
        if (this.currentAnimation === name)
            return false;
        console.log(name);
        this.currentAnimation = name;
        this.currentStartFrame = this.animations[name].startFrame;
        this.currentEndFrame = this.animations[name].endFrame;
        this.currentAnimationFrame = this.animations[name].startFrame;
    }
}