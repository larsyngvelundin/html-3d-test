import addLine from "./js/addLine.js";
import radiansToDegrees from "./js/radiansToDegrees.js";
import inverseCotangent from "./js/inverseCotangent.js";
import addEventListeners from "./js/addEventListeners.js";
import createArch from "./js/presetPolygons/createArch.js";
import updateRender from "./js/updateRender.js";

let game = document.getElementById("game");
document.body.style.background = "#000000";

game.dataset.fps = 1;
game.dataset.frameTime = 1000 / game.dataset.fps;

game.dataset.camPosZ = 0.0;
game.dataset.camPosX = 0.0;
game.dataset.camPosY = 5.0;
game.dataset.fov = 60;
game.dataset.groundY = -1.5;

for (let i = 0; i < 5; i++) {
    createArch(Math.random() * 2 - 1, game.dataset.groundY, i * 25 + 95);
}

let gameLoop = setInterval(() => {
    console.log(`FPS:${game.dataset.fps}
    Frame time${game.dataset.frameTime}
    Seconds:${game.dataset.frameTime / 1000}`)

    updateRender();

}, game.dataset.frameTime);

addEventListeners();