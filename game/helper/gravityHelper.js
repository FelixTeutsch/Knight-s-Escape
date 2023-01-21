class GravityHelper {
    gravityFactor = 9.81;

    checkForGravityCollision(object1, object2) {
        let moveDown = object1.antiGravityForce <= 0;

        if (gameManager.detectCollision(object1, object2)) {
            if (object1.currentGravityCollisionObject == null)
                object1.currentGravityCollisionObject = object2;
            else if (moveDown && object2.boundaries.getTopBoundary() < object1.currentGravityCollisionObject.boundaries.getTopBoundary())
                object1.currentGravityCollisionObject = object2;
            else if (!moveDown && object2.boundaries.getBottomBoundary() > object1.currentGravityCollisionObject.boundaries.getBottomBoundary())
                object1.currentGravityCollisionObject = object2;
        }
    }

    applyGravityForces(object, undoPrevious) {
        if (!object.useGravity) {
            return;
        }

        let moveDown = true;
        let multiplier = 1;

        if (object.antiGravityForce > 0) {
            moveDown = false;
        }

        if (undoPrevious) {
            multiplier = -1;
        }
        if (moveDown) {
            object.position.y += gameManager.getTimeAdjustedValue(this.gravityFactor * multiplier * object.mass);
        }
        else {
            // object.antiGravityForce -= this.gravityFactor * multiplier * object.mass;
            // object.position.y -= this.gravityFactor * multiplier * object.mass;
            console.log("Move Up");
            object.antiGravityForce -= gameManager.getTimeAdjustedValue(this.gravityFactor / 2.1* multiplier * object.mass);
            object.position.y -= object.antiGravityForce;
        }
    }

    applyGameObjectToHitPlatform(object) {
        let moveDown = object.antiGravityForce <= 0;

        if (moveDown) {
            object.position.y = object.currentGravityCollisionObject.boundaries.getTopBoundary() - object.dimensions.height - object.boundaryOffsets.bottom - 1;
            object.isFalling = false;
        }
        else {
            object.position.y = object.currentGravityCollisionObject.boundaries.getBottomBoundary() - object.boundaryOffsets.top;
            object.antiGravityForce = 0;
            object.isFalling = true;
        }
    }
}