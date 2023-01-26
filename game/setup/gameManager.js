class GameManager {
	//properties
	gameObjects = [];
	canvas = null;
	previousTimeStamp = 0;
	deltaTime;
	timeModyfier = 30;
	gameOver = false;
	playerWon = true;

	showHitbox = false;
	showSpriteSize = false;
	constructor() {
		window.gameManager = this;
		window.gravityHelper = new GravityHelper();
		this.gameOver = false;
		// window.mouseHelper = new MouseHelper();
		//LOGGER.log("gameManager created");
	}

	// Reset the Game!
	restartGame() {
		gameManager.gameOver = false;
		gameManager.gameObjects = [];
	}

	//functions
	gameLoop() {
		if (gameManager.gameOver)
			return true;
		if (gameManager.previousTimeStamp == 0) {
			gameManager.previousTimeStamp = performance.now();
		}
		let currentTimeStamp = performance.now();
		gameManager.deltaTime = currentTimeStamp - gameManager.previousTimeStamp;
		gameManager.previousTimeStamp = currentTimeStamp;
		/* new - if you want to use deltaTime, please have a look on the
		   videos "2, 3, 4, 5" (in total ~40 minutes) of the second non-mandatory
		   video (== third video lesson)
		*/
		canvas.drawLayer.clearRect(0, 0, canvas.canvasHTMLElement.width, canvas.canvasHTMLElement.height);
		for (let gameLoopState = 0; gameLoopState < 5; gameLoopState++) {
			//gameLoopState 0 -> store positions of and update all objects 
			//gameLoopState 1 -> check if the updated objects are colliding
			//gameLoopState 2 -> apply Gravity Forces to all objects (where useGravity == true)
			//gameLoopState 3 -> check if objects (after gravity) are hitting something
			//gameLoopState 4 -> apply changes after gravity, execute mousehandlers and finally: DRAW

			gameManager.gameObjects.forEach((gameObject) => {
				if (gameObject.isActive) {
					if (gameLoopState == 0) {
						gameObject.storePosition();
						gameObject.update();
					}
					if (gameLoopState == 1) {
						gameObject.currentGravityCollisionObject = null;
						gameManager.checkObjectsForCollisions(gameObject);
					}
					if (gameLoopState == 2 && gameObject.useGravity) {
						gravityHelper.applyGravityForces(gameObject, false);
					}
					if (gameLoopState == 3) {
						gameManager.checkObjectsForGravityCollisions(gameObject);
					}
					if (gameLoopState == 4) {
						if (gameObject.useGravity) {
							if (gameObject.currentGravityCollisionObject != null) {
								gravityHelper.applyGravityForces(gameObject, true);
								gravityHelper.applyGameObjectToHitPlatform(gameObject);
							}
							else {
								gameObject.isFalling = true;
							}
						}
						// mouseHelper.checkObjectMouseEvent(gameObject);

						//gameObject.rotate();				
						gameObject.draw();
						//gameObject.restoreCanvas();
					}
					// Fix Pixel bugs
					if(gameLoopState == 5) {
						gameObject.position.x = Math.floor(gameObject.position.x);
						gameObject.position.y = Math.floor(gameObject.position.y);
					}
				}
			});
		}
		// mouseHelper.recentMouseEvent = 0;	
		requestAnimationFrame(gameManager.gameLoop);
	}

	checkObjectsForCollisions(object1) {
		for (let i = object1.gameObjectIndex + 1; i < gameManager.gameObjects.length; i++) {
			let object2 = gameManager.gameObjects[i];
			if (object2.isActive) {
				//normal collision after update
				let collisionDetected = this.detectCollision(object1, object2);
				if (collisionDetected) {
					object1.onCollision(object2);
					object2.onCollision(object1);
				}
			}
		}
	}

	checkObjectsForGravityCollisions(object1) {
		for (let i = object1.gameObjectIndex + 1; i < gameManager.gameObjects.length; i++) {
			let object2 = gameManager.gameObjects[i];
			if (object2.isActive && object2.isRigid && object1.useGravity) {
				gravityHelper.checkForGravityCollision(object1, object2);
			}
			if (object2.isActive && object1.isRigid && object2.useGravity) {
				gravityHelper.checkForGravityCollision(object2, object1);
			}
		}
	}


	detectCollision(object1, object2) {
		//overlap on x axis
		if (object1.boundaries.getLeftBoundary() <= object2.boundaries.getRightBoundary() &&
			object1.boundaries.getRightBoundary() >= object2.boundaries.getLeftBoundary()) {
			//overlap on y axis
			if (object1.boundaries.getTopBoundary() <= object2.boundaries.getBottomBoundary() &&
				object1.boundaries.getBottomBoundary() >= object2.boundaries.getTopBoundary()) {
				return true;
			}
		}
	}

	addGameObject(object) {
		this.gameObjects.push(object);
		object.gameObjectIndex = this.gameObjects.length - 1;
		//LOGGER.log(object.name, "has been added!");
	}

	setCanvas(canvas) {
		this.canvas = canvas;
	}

	getTimeAdjustedValue(value) {
		// return value / (1000 / 30) * (gameManager.deltaTime);
		return value;
	}

}

