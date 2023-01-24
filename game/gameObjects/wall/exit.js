class Exit extends Obstacle {
    constructor(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight) {
        height ??= 71;
        width ??= 80;
        src ??= "./image/exit/exit.png";
        super("exit", x, y - height + 16, width, height, src, row ?? 0, col ?? 0, spriteWidth ?? (width ?? 80), spriteHeight ?? (height ?? 71));
    }
}