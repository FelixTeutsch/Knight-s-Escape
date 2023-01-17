class MarkRectangle extends GameObject {
    static markRectangles = [];
    #positionMode = true;
    #isConfirmed = false;
    #htmlInfoDisplay = null;
    #htmlInfoOccupied = false;

    constructor(name, width, height, x, y) {
        super(name, width, height, x, y);
        MarkRectangle.setAllConfirmed();
        MarkRectangle.markRectangles.push(this);
        this.#positionMode = true;
        this.#htmlInfoDisplay = document.getElementById(this.name + "Info");
    }

    update() {
        if (this.#isConfirmed)
            return;
        else {
            if (this.#positionMode) {
                this.position.x = mouseHelper.mouseCoordinates.x - this.dimensions.width / 2;
                this.position.y = mouseHelper.mouseCoordinates.y - this.dimensions.height / 2;
            }
            else {
                this.dimensions.width = Math.max(10, mouseHelper.mouseCoordinates.x - this.position.x);
                this.dimensions.height = Math.max(10, mouseHelper.mouseCoordinates.y - this.position.y);
            }
        }
    }

    draw() {
        let color = "rgba(90,80,255,.4)";
        if (this.#htmlInfoOccupied && this.#isConfirmed) {
            color = "rgba(80,190,0,.28)";
        }
        if (this.#htmlInfoOccupied && !this.#isConfirmed && this.#positionMode) {
            color = "rgba(200,0,150,.75)";
        }
        if (this.#htmlInfoOccupied && !this.#isConfirmed && !this.#positionMode) {
            color = "rgba(200,0,150,.75)";
            ///color = "rgba(200,80,0,.75)";
        }
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = color;
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();   
    }

    confirm() {
        this.#isConfirmed = true;
    }

    unConfirm() {
        MarkRectangle.setAllConfirmed();
        if (this.isActive)
            this.#isConfirmed = false;
    }

    static setAllConfirmed() {
        for (let markRectangle of MarkRectangle.markRectangles) {
            markRectangle.confirm();
        }
    }

    onMouseEvent(mouseEventType) {
       if (mouseEventType == 0) {
            if (this.#htmlInfoDisplay != null && !this.#htmlInfoOccupied)
                this.#htmlInfoOccupied = true;
                this.#htmlInfoDisplay.innerHTML = `
                    <span style='display: block'> X: ${this.position.x}</span>
                    <span style='display: block'> Y: ${this.position.y}</span>
                    <span style='display: block'> WIDTH: ${this.dimensions.width}</span>
                    <span style='display: block'> HEIGHT: ${this.dimensions.height}</span>
                `;
       }
       if (mouseEventType >= 12)  {
            this.#htmlInfoOccupied = false;
            if (this.#htmlInfoDisplay != null)
                this.#htmlInfoDisplay.innerHTML = ``;
        }
        /*
            mouseEvent: 
            0 == hover, 
            1 == left down initial, 2 == middle down initial, 3 == right down initial, 
            4 == left down held, 5 == middle up held, 6 == right up held, 
            7 == left up, 8 == middle up, 9 == right up, 
            10 == left click, 11 == middle click, 12 == right click
        */
        if (mouseEventType < 10 || mouseEventType > 12)
            return; 

        let previousPositionMode = this.#positionMode;
        let previousConfirmStatus = this.#isConfirmed;

        this.#htmlInfoOccupied = false;

        if (mouseEventType == 12)
            this.isActive = false;
    
        this.unConfirm();

        if (mouseEventType == 10) 
            this.#positionMode = true;
    
        if (mouseEventType == 11) 
            this.#positionMode = false; 

        if (previousPositionMode == this.#positionMode && previousConfirmStatus == false)
            this.confirm();
    }
}