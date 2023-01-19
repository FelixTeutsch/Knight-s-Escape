let keyPressing = {

}

let selected = 0;

function keyDown(event) {
    if (keyPressing[event.key])
        return;
    switch (event.key.toLowerCase()) {
        case "w": case "arrowup": case " ":
            keyPressing[event.key] = player.jump();
            LOGGER.log("Jump");
            break;

        case "s": case "arrowdown":
            keyPressing[event.key] = player.crouch(true);
            LOGGER.log("Crouch");
            break;

        case "a": case "arrowleft":
            keyPressing[event.key] = player.walkLeft(true);
            LOGGER.log("Left");
            break;

        case "d": case "arrowright":
            keyPressing[event.key] = player.walkRight(true);
            LOGGER.log("Right");
            break;
        case "shift":
            keyPressing[event.key] = player.dash();
            LOGGER.log("Dash");
            break;
        case "e": case "0":
            LOGGER.log("Pick Up / Use");
            break;
        default:
            LOGGER.log(event.key);
    }
}

function keyUp(event) {
    keyPressing[event.key] = false;
    switch (event.key) {
        case "w": case "arrowup": case " ":
            //keyPressing[event.key] = player.jump(false);
            break;

        case "s": case "arrowdown":
            keyPressing[event.key] = player.crouch(false);
            break;

        case "a": case "arrowleft":
            keyPressing[event.key] = player.walkLeft(false);
            break;

        case "d": case "arrowright":
            keyPressing[event.key] = player.walkRight(false);
            break;
        /*
                case "shift":
                    keyPressing[event.key] = player.dash(true);
                    LOGGER.log("Dash");
                    break;
        
                case "e": case "0":
        
                    LOGGER.log("Pick Up / Use");
                    break;
        */

    }
}

function mouseDown(event) {
    switch (event.button) {
        case 0:
            LOGGER.log("Primary Attack");
            break;
        case 1:
            LOGGER.log("Middle Click");
            break;
        case 2:
            LOGGER.log("Bonus Attack");
            break;
    }
}

function scrollEvent(event) {
    if (event.deltaY > 0) // Scroll forward
        selected = mod(++selected, 3);
    else if (event.deltaY < 0)// Scroll Backward
        selected = mod(--selected, 3);
    else if (event.deltaX > 0)
        selected = mod(++selected, 3);
    else
        selected = mod(--selected, 3);

    player.selectNewWeapon(selected);
    //LOGGER.log("Item: ", selected, "selected")
}

function mod(n, m) {
    return ((n % m) + m) % m;
}


window.addEventListener("keyup", keyUp);
window.addEventListener("keydown", keyDown);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("wheel", scrollEvent);
LOGGER.log("Input handeling was Activated");