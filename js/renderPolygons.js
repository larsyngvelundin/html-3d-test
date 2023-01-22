import getScreenPositions from "./getScreenPositions.js";

export default function renderPolygons(polygons) {
    let game = document.getElementById("game");
    // console.log(polygons);
    console.log(`Rendering ${polygons.length} polygons`);
    for (let i = polygons.length - 1; i >= 0; i--) {
        // console.log(polygons[i]);
        if (polygons[i].classList.contains("remove")) {
            polygons[i].remove();
        }
        else {
            let distance1 = polygons[i].dataset.posZ1 - game.dataset.camPosZ;
            let distance3 = polygons[i].dataset.posZ3 - game.dataset.camPosZ;
            if (distance1 > 0 && distance3 > 0) {

                let viewportWidth = document.documentElement.clientWidth;
                let viewportHeight = document.documentElement.clientHeight;
                polygons[i].style.display = "block";
                polygons[i].style.zIndex = 100000 - distance1;

                let screenPositions = getScreenPositions(polygons[i], viewportWidth, viewportHeight);
                if (i == 0) {
                    console.log(screenPositions)
                }


                polygons[i].style.clipPath = `polygon(${screenPositions[0][0]}% ${screenPositions[0][1]}%,
                ${screenPositions[1][0]}% ${screenPositions[1][1]}%,
                ${screenPositions[2][0]}% ${screenPositions[2][1]}%,
                ${screenPositions[3][0]}% ${screenPositions[3][1]}%)`;
            }
            else {
                polygons[i].style.display = "none";
            }
        }
    }
}