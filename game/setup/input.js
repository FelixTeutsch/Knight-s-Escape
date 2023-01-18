let keyPressing = {

}

let selected = 0;

function keyDown(event) {
    if (keyPressing[event.key])
        return;
    keyPressing[event.key] = true;
    switch (event.key.toLowerCase()) {
        case "w": case "arrowup": case " ":
            if (player.isFalling || player.antiGravityForce > 0) {
                keyPressing[event.key] = false;
                return;
            }

            player.startJump = true;

            //player.move.vertical = 1;
            console.log("Jump");
            break;
        case "s": case "arrowdown":
            player.move.vertical = -1;
            console.log("Duck");
            break;


        case "a": case "arrowleft":

            if (player.move.vertical != 0 || player.move.horizontal != 0) {
                keyPressing[event.key] = false;
                return;
            }
            player.move.vertical = 0;
            player.move.horizontal = -player.moveVelocity;

            console.log("Left");
            break;
        case "d": case "arrowright":
            if (player.move.vertical != 0 || player.move.horizontal != 0) {
                keyPressing[event.key] = false;
                return;
            }
            player.move.horizontal = player.moveVelocity;
            player.move.vertical = 0;

            console.log("Right");
            break;
        case "shift":
            console.log("Dash");
            break;
        case "e": case "0":
            console.log("Pick Up / Use");
            break;
        default:
            console.log(event.key);
    }
}

function keyUp(event) {
    keyPressing[event.key] = false;
    switch (event.key) {

        case "w": case "arrowup": case " ":

            console.log("Jump");
            break;
        case "s": case "arrowdown":
            player.move.vertical = 0;
            console.log("Duck");
            break;


        case "a": case "arrowleft":
            player.move.horizontal = 0;

            console.log("Left");
            break;
        case "d": case "arrowright":
            player.move.horizontal = 0;

            console.log("Right");
            player.move.horizontal = 0;
            break;
        case "shift":
            console.log("Dash");
            break;
        case "e": case "0":
            console.log("Pick Up / Use");
            break;


    }
}

function mouseDown(event) {
    switch (event.button) {
        case 0:
            console.log("Primary Attack");
            break;
        case 1:
            console.log("Middle Click");
            break;
        case 2:
            console.log("Bonus Attack");
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
    //console.log("Item: ", selected, "selected")
}

function mod(n, m) {
    return ((n % m) + m) % m;
}


window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("wheel", scrollEvent);
console.log("Input handeling was Activated");