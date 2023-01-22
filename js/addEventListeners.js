export default function addEventListeners() {
    let game = document.getElementById("game");
    document.addEventListener("keypress", (e) => {
        switch (e.key) {
            case "w":
            case "W":
                game.dataset.camPosZ += 1;
                break;
            case "s":
            case "S":
                game.dataset.camPosZ -= 1;
                break;
            case "a":
            case "A":
                game.dataset.camPosX -= 1;
                break;
            case "d":
            case "D":
                game.dataset.camPosX += 1;
                break;
        }
    });

    document.addEventListener("keyup", (e) => {
        switch (e.key) {
            case "q":
            case "Q":
                if (game.dataset.autoMove) {
                    game.dataset.autoMove = false;
                }
                else {
                    game.dataset.autoMove = true;
                }
                break;
            case "r":
            case "R":
                clearRender();
                initLines();
                break;
            case "t":
            case "T":
                clearRender();
                initPolygons();
                break;
            case "h":
            case "H":
                console.log("test");
                console.log(instr.style.display);
                console.log(instr.style.display == "hide");
                if (instr.classList.contains("hide")) {
                    instr.classList.remove("hide");
                }
                else {
                    instr.classList.add("hide");
                }
                break;
        }
    });

}