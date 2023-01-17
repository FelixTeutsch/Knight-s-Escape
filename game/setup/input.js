function keyDown(event) {
    switch (event.key) {
        case "w": case "ArrowUp": case " ":
            console.log("Up");
            break;
        case "a": case "ArrowLeft":
            console.log("Left");
            break;
        case "s": case "ArrowDown":
            console.log("Down");
            break;
        case "d": case "ArrowRight":
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

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("mousedown", mouseDown);
console.log("Input handeling was Activated");