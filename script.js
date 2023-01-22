import addLine from "./js/addLine.js";
import radiansToDegrees from "./js/radiansToDegrees.js";
import inverseCotangent from "./js/inverseCotangent.js";
import addEventListeners from "./js/addEventListeners.js";

let game = document.getElementById("game");
document.body.style.background = "#000000";

game.dataset.fps = 1;
game.dataset.frameTime = 1000/game.dataset.fps;

game.dataset.camPosZ = 0.0;
game.dataset.camPosX = 0.0;
game.dataset.camPosY = 5.0;
game.dataset.fov = 60;

console.log("before interval")


let gameLoop = setInterval(() => {
    console.log(`FPS:${game.dataset.fps}
    Frame time${game.dataset.frameTime}
    Seconds:${game.dataset.frameTime/1000}`)

}, game.dataset.frameTime);

console.log("after interval")

addEventListeners();