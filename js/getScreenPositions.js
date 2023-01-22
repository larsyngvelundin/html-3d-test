export default function getScreenPositions(polygon, viewportWidth, viewportHeight) {
    let game = document.getElementById("game");

    let screenPositions = [];

    screenPositions.push(getScreenPositionsForPoint(polygon.dataset.posX1,
        polygon.dataset.posZ1, polygon.dataset.posY1,
        viewportWidth, viewportHeight));
    screenPositions.push(getScreenPositionsForPoint(polygon.dataset.posX2,
        polygon.dataset.posZ2, polygon.dataset.posY2,
        viewportWidth, viewportHeight));
    screenPositions.push(getScreenPositionsForPoint(polygon.dataset.posX3,
        polygon.dataset.posZ3, polygon.dataset.posY3,
        viewportWidth, viewportHeight));
    screenPositions.push(getScreenPositionsForPoint(polygon.dataset.posX4,
        polygon.dataset.posZ4, polygon.dataset.posY4,
        viewportWidth, viewportHeight));

    return screenPositions;
}

function getScreenPositionsForPoint(posX, posY, posZ, viewportWidth, viewportHeight) {
    let distance = posZ;// - game.dataset.camPosZ;
    let highest = distance / 2;
    let screenPositions = []

    let yRes = (posY / highest) * (viewportHeight / 2);
    yRes = -yRes + (viewportHeight / 2);
    yRes = (yRes / viewportHeight * 100);
    let xRes = (posX / highest) * (viewportWidth / 2);
    xRes = -xRes + (viewportWidth / 2);
    xRes = (xRes / viewportWidth * 100);
    screenPositions.push(xRes);
    screenPositions.push(yRes);
    return screenPositions;

}