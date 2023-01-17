class MouseHelper {
	recentMouseEvent =  0; 
            /*
                recentMouseEvent: 
                0 == hover, 
                1 == left down initial, 2 == middle down initial, 3 == right down initial, 
                4 == left down held, 5 == middle up held, 6 == right up held, 
                7 == left up, 8 == middle up, 9 == right up, 
                10 == left click, 11 == middle click, 12 == right click,
                13 == focus lost
            */
    mouseCoordinates = {
        x: 0,
        y: 0
    }
	scaleInformation = {
		"x": 1,
		"y": 1
	};

    constructor() {
        this.executeSetupWhenCanvasIsReady();
       
    }

    executeSetupWhenCanvasIsReady() {
        setTimeout(() => {
            if (gameManager.canvas != null) {
                this.calculateCanvasScaling();
                gameManager.canvas.canvasHTMLElement.addEventListener("resize", (eventInformation) => {
                    this.calculateCanvasScaling();
                });
                gameManager.canvas.canvasHTMLElement.addEventListener("mousedown",  (eventInformation) => {
                    this.recentMouseEvent = eventInformation.button + 1;
                    eventInformation.preventDefault();
                });
                gameManager.canvas.canvasHTMLElement.addEventListener("mouseup",  (eventInformation) => {
                    this.recentMouseEvent = eventInformation.button + 7;
                    eventInformation.preventDefault();
                });
                gameManager.canvas.canvasHTMLElement.addEventListener("click",  (eventInformation) => {
                    eventInformation.preventDefault();
                });
                gameManager.canvas.canvasHTMLElement.addEventListener("contextmenu",  (eventInformation) => {
                    eventInformation.preventDefault();
                });
                gameManager.canvas.canvasHTMLElement.addEventListener("mousemove",  (eventInformation) => {
                    this.mouseCoordinates.x = eventInformation.offsetX * this.scaleInformation.x;
                    this.mouseCoordinates.y = eventInformation.offsetY * this.scaleInformation.y;
                });
            }
            else {
                mouseHelper.executeCanvasScalingFirstTime();
            }
        }, 500);
    }

    calculateCanvasScaling() {
        mouseHelper.scaleInformation.x = gameManager.canvas.canvasHTMLElement.width / gameManager.canvas.canvasHTMLElement.clientWidth;
        mouseHelper.scaleInformation.y = gameManager.canvas.canvasHTMLElement.height / gameManager.canvas.canvasHTMLElement.clientHeight;
    }
    
	checkObjectMouseEvent (object) {
        let mouseEvent = this.recentMouseEvent;

		if(object.boundaries.getLeftBoundary() <= this.mouseCoordinates.x &&
		object.boundaries.getRightBoundary() >= this.mouseCoordinates.x) {
			if(object.boundaries.getTopBoundary() <= this.mouseCoordinates.y &&
			object.boundaries.getBottomBoundary() >= this.mouseCoordinates.y) {
				if (this.recentMouseEvent >= 1 && this.recentMouseEvent <= 3) {
					object.hadMemorableMouseEvent = this.recentMouseEvent;
				}
				else if (this.recentMouseEvent == 7 || this.recentMouseEvent == 8 || this.recentMouseEvent == 9) {
					if (object.hadMemorableMouseEvent > 0) {
						mouseEvent += 3;
						object.hadMemorableMouseEvent = 0;
					}
				}
				else if (object.hadMemorableMouseEvent != undefined && object.hadMemorableMouseEvent > 0) {
					mouseEvent = object.hadMemorableMouseEvent + 3;
				}
                else if (this.recentMouseEvent == 0 && (object.hadMemorableMouseEvent == undefined || object.hadMemorableMouseEvent == -1)) {
                    object.hadMemorableMouseEvent = 0;
				}
				object.onMouseEvent(mouseEvent);
			}
			else {
                if (object.hadMemorableMouseEvent != undefined && object.hadMemorableMouseEvent > -1) 
                    object.onMouseEvent(13);
				object.hadMemorableMouseEvent = -1;
			}
		}
		else {
            if (object.hadMemorableMouseEvent != undefined && object.hadMemorableMouseEvent > -1) 
                object.onMouseEvent(13);
			object.hadMemorableMouseEvent = -1;
		}
	}

}