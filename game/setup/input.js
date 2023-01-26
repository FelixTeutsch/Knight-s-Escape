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

        case "h":
            keyPressing[pressedKey] = true;
            console.log("Hitboxes", (gameManager.showHitbox = !gameManager.showHitbox) ? "Shown" : "Hidden");
            break;
        case "g":
            keyPressing[pressedKey] = true;
            console.log("Sprite Sizes", (gameManager.showSpriteSize = !gameManager.showSpriteSize) ? "Shown" : "Hidden");
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
            break;

        case "h":
            keyPressing[pressedKey] = false;
            break;
        case "g":
            keyPressing[pressedKey] = false;
            break;
    }
}

function mouseDown(event) {
    if (gameStarted)
        switch (event.button) {
            case 0:
                LOGGER.log("Primary Attack", player.primaryAttack());
                break;
            case 1:
                LOGGER.log("Middle Click");
                break;
            case 2:
                player.bonusAttack();
                LOGGER.log("Bonus Attack");
                break;
        }
    else if (gameOver) {
        console.log("Reload!");
        window.location.reload(false);
    }
    else
        startGame();
}

function scrollEvent(event) {
    if (event.deltaY > 0) // Scroll forward
        selected = mod(++selected, 2);
    else if (event.deltaY < 0)// Scroll Backward
        selected = mod(--selected, 2);
    else if (event.deltaX > 0)
        selected = mod(++selected, 2);
    else
        selected = mod(--selected, 2);

    selected = player.selectNewWeapon(selected);
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