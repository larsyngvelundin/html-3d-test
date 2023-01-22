
export default function initPolygons() {
    let game = document.getElementById("game");
    // buildTunnel();
    // for (let i = 0; i < 5; i++) {
    //     buildSFArchPolygon(Math.random() * 2 - 1, groundY, i * 25 + 95);
    // }

    // for (let i = 0; i < 9; i++) {
    //     for (let j = 0; j < 7; j++) {
    //         addDot((j * (Math.random() * 5)) - 10, groundY, i * (Math.random() * 20) + 75, "#005500");
    //     }
    // }

    //fake sky and ground
    let sky = document.createElement("div");
    sky.style.position = "absolute";
    sky.style.background = "skyblue";
    sky.classList.add("object");
    sky.style.width = "100%";
    sky.style.height = "50%";
    sky.style.zIndex = 2;
    let skyRemoveCheck = setInterval(() => {
        if (sky.classList.contains("remove")) {
            clearInterval(skyRemoveCheck);
            sky.remove();
        }
    }, game.dataset.frameTime)
    game.appendChild(sky);

    let ground = document.createElement("div");
    ground.style.position = "absolute";
    ground.style.background = "#007700";
    ground.classList.add("object");
    ground.style.width = "100%";
    ground.style.height = "100%";

    let groundRemoveCheck = setInterval(() => {
        if (ground.classList.contains("remove")) {
            clearInterval(groundRemoveCheck);
            ground.remove();
        }
    }, game.dataset.frameTime)
    game.appendChild(ground);
}