let keyPressing = {

}

let selected = 0;

function keyDown(event) {
    if (keyPressing[event.key])
        return;
    keyPressing[event.key] = true;
    switch (event.key.toLowerCase()) {
        case "w": case "arrowup": case " ":
            console.log("Up");
            break;
        case "a": case "arrowleft":
            console.log("Left");
            break;
        case "s": case "arrowdown":
            console.log("Down");
            break;
        case "d": case "arrowright":
            console.log("Right");
            break;
        case "shift":
            console.log("Shift");
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

    }
}

function mouseDown(event) {
    switch (event.button) {
        case 0:
            console.log("Left Click");
            break;
        case 1:
            console.log("Middle Click");
            break;
        case 2:
            console.log("Right Click");
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