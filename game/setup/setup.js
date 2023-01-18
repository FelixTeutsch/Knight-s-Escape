// Create Game Manager
let gameManager = new GameManager();
let canvas = new Canvas("canvas");
let player;

let levelMap = [
    ["┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌"],
    ["┌", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "┌"],
    ["┌", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "┌"],
    ["┌", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "┌"],
    ["┌", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "┌"],
    ["┌", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "┌"],
    ["┌", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "┌"],
    ["┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌", "┌"]
];

let spriteLoader = new SpriteLoader(levelMap);
spriteLoader.createLevel();


requestAnimationFrame(gameManager.gameLoop);