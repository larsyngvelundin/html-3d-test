export default function addPolygon(color, posX1, posY1, posZ1,
    posX2, posY2, posZ2,
    posX3, posY3, posZ3,
    posX4, posY4, posZ4) {
    let game = document.getElementById("game");
    // let locationData = [[posX1, posY1, posZ1],
    // [posX2, posY2, posZ2],
    // [posX3, posY3, posZ3],
    // [posX4, posY4, posZ4]];
    let polygon = document.createElement("div");
    polygon.dataset.posX1 = posX1;
    polygon.dataset.posX2 = posX2;
    polygon.dataset.posX3 = posX3;
    polygon.dataset.posX4 = posX4;
    polygon.dataset.posY1 = posY1;
    polygon.dataset.posY2 = posY2;
    polygon.dataset.posY3 = posY3;
    polygon.dataset.posY4 = posY4;
    polygon.dataset.posZ1 = posZ1;
    polygon.dataset.posZ2 = posZ2;
    polygon.dataset.posZ3 = posZ3;
    polygon.dataset.posZ4 = posZ4;
    polygon.style.position = "absolute";
    polygon.style.background = color;
    polygon.style.width = "100%";
    polygon.style.height = "100%";
    polygon.classList.add("polygon");
    polygon.classList.add("object");
    polygon.style.clipPath = `polygon(0 0, 0 0, 0 0, 0 0)`;

    game.appendChild(polygon);
}