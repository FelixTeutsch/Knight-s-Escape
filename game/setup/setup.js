// Create Game Manager
let gameManager = new GameManager();
let canvas = new Canvas("canvas");
let player;

let levelMap = [
    ["1", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "2"],
    ["l", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "r"],
    ["l", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "r"],
    ["l", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "r"],
    ["l", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "r"],
    ["l", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "r"],
    ["l", "0", "0", "p", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "r"],
    ["3", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "4"]
];

let spriteLoader = new SpriteLoader(levelMap);
spriteLoader.createLevel();

player.setCurrentAnimation(0,0);

requestAnimationFrame(gameManager.gameLoop);