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

function scrollEvent(event) {
    if (event.deltaY > 0) // Scroll forward
        selected = ++selected % 3;
    else // Scroll Backward
        selected = --selected % 3;
    console.log("Item: ", selected, "selected")
}

let selected = 0;

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("wheel", scrollEvent);
console.log("Input handeling was Activated");