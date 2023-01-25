let keyPressing = {}
let keyRequest = {}

let selected = 0;

function keyDown(event) {
    let pressedKey = event.key.toLowerCase();
    if (keyPressing[pressedKey])
        return;
    switch (pressedKey) {
        case "w": case "arrowup": case " ":
            keyPressing[pressedKey] = true;
            keyRequest[pressedKey] = true;
            player.jumpHold = true;
            LOGGER.log("Jump");
            break;

        case "s": case "arrowdown":
            if (player.crouch(true))
                keyPressing[pressedKey] = true;
            else
                keyRequest[pressedKey] = true;
            LOGGER.log("Crouch");
            break;

        case "a": case "arrowleft":
            if (player.walkLeft(true))
                keyPressing[pressedKey] = true;
            else
                keyRequest[pressedKey] = true;
            LOGGER.log("Left");
            break;

        case "d": case "arrowright":
            if (player.walkRight(true))
                keyPressing[pressedKey] = true;
            else
                keyRequest[pressedKey] = true;
            LOGGER.log("Right");
            break;
        case "shift":
            if (player.dash())
                keyPressing[pressedKey] = true;
            else
                keyRequest[pressedKey] = true;
            LOGGER.log("Dash");
            break;
        case "e": case "0":
            keyPressing[pressedKey] = player.pickUp(true);
            break;
        default:
            LOGGER.log(pressedKey);
    }
}

function keyUp(event) {
    let pressedKey = event.key.toLowerCase();
    keyPressing[pressedKey] = false;
    keyRequest[pressedKey] = false;
    switch (pressedKey) {
        case "w": case "arrowup": case " ":
            player.jumpHold = false;
            player.jump();
            break;

        case "s": case "arrowdown":
            keyPressing[pressedKey] = player.crouch(false);
            if (keyRequest["d"] || keyRequest["arrowright"]) {
                keyRequest["d"] = keyRequest["arrowright"] = false;
                player.walkRight(true);
            } else if (keyRequest["a"] || keyRequest["arrowleft"]) {
                keyRequest["a"] = keyRequest["arrowleft"] = false;
                player.walkLeft(true);
            }
            break;

        case "a": case "arrowleft":
            keyPressing[pressedKey] = player.walkLeft(false);
            keyRequest[pressedKey] = false;
            if (keyRequest["d"] || keyRequest["arrowright"]) {
                keyRequest["d"] = keyRequest["arrowright"] = false;
                player.walkRight(true);
            } else if (keyRequest["s"] || keyRequest["arrowdown"]) {

                player.crouch(true);
            }
            break;

        case "d": case "arrowright":
            keyPressing[pressedKey] = player.walkRight(false);
            if (keyRequest["a"] || keyRequest["arrowleft"]) {
                keyRequest["a"] = keyRequest["arrowleft"] = false;
                player.walkLeft(true);
            } else if (keyRequest["s"] || keyRequest["arrowdown"]) {
                keyRequest["s"] = keyRequest["arrowdown"] = false;
                player.crouch(true);
            }
            break;
        /*
                case "shift":
                    keyPressing[pressedKey] = player.dash(true);
                    LOGGER.log("Dash");
                    break;
                    */

        case "e": case "0":
            keyPressing[pressedKey] = player.pickUp(false);
            LOGGER.log("Pick Up / Use");
            break;

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