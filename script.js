let game = document.getElementById("game");
document.body.style.background = "#000000";
let frameWait = 16;
let autoMove = false;
let movingForward = true;
frameWait = 16;
let camPosZ = 0.0;
let camPosX = 10.0;
let fov = 60;
let groundY = -1.5;

//instructions
let instr = document.createElement("div");
instr.innerHTML = "Works best in a square window<br>R - Start Wireframe<br>T - Start Polygon<br>W - Move Forward<br>S - Move Backwards<br>Q - Toggle Auto Move<br>H - Hide This";
instr.style.color = "#ffffff";
instr.style.fontSize = "2em";
instr.style.position = "absolute";
instr.style.zIndex = 99;
document.body.appendChild(instr);

function radToDeg(radians) {
    return radians * (180 / Math.PI);
}

//stolen inverse cotangent function
function arcctg(x) { return Math.PI / 2 - Math.atan(x); }

document.addEventListener("keypress", (e) => {
    switch (e.key) {
        case "w":
        case "W":
            camPosZ += 1;
            break;
        case "s":
        case "S":
            camPosZ -= 1;
            break;
        case "a":
        case "A":
            camPosX -= 1;
            break;
        case "d":
        case "D":
            camPosX += 1;
            break;
    }
});

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "q":
        case "Q":
            if (autoMove) {
                autoMove = false;
            }
            else {
                autoMove = true;
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

function addLine(x1, y1, z1, x2, y2, z2) {
    let posY1 = y1;
    let posZ1 = z1;
    let posX1 = x1;
    let posY2 = y2;
    let posZ2 = z2;
    let posX2 = x2;
    let size = 50;

    let line = document.createElement("div");
    line.style.position = "absolute";

    line.style.left = "100" + "px";
    line.style.top = "100" + "px";
    line.style.width = "1px";
    line.style.height = "100px";
    line.classList.add("line");
    line.classList.add("object");

    //limit width near camera
    line.style.maxHeight = "12.5px";

    game.appendChild(line);

    let drawLines = setInterval(() => {
        if (line.classList.contains("remove")) {
            clearInterval(drawLines);
            line.remove();
        }
        let vh = document.documentElement.clientHeight;
        let vw = document.documentElement.clientWidth;
        let distance = posZ1 - camPosZ;
        let distance2 = posZ2 - camPosZ;
        if (distance > 0) {
            line.style.display = "block";
            yRes1 = 50 * vh / 100;

            let highest1 = distance / 2;
            let highest2 = distance2 / 2;

            //Determine Start Y
            yRes1 = (posY1 / highest1) * (vh / 2);
            yRes1 = -yRes1 + (vh / 2);
            line.style.top = yRes1 + "px";
            yRes2 = (posY2 / highest2) * (vh / 2);
            yRes2 = -yRes2 + (vh / 2);

            //Determine Start X
            xRes1 = (posX1 / highest1) * (vw / 2);
            xRes1 = -xRes1 + (vw / 2);
            line.style.left = xRes1 + "px";
            xRes2 = (posX2 / highest2) * (vw / 2);
            xRes2 = -xRes2 + (vw / 2);

            //Sizing based on distance
            line.style.height = size / distance + "px";
            line.style.width = line.style.height;

            //calculate width/rotation to reach second coordinate
            let sideA = Math.abs(xRes1 - xRes2);
            let sideB = Math.abs(yRes1 - yRes2);
            let lineDegree = radToDeg(arcctg(sideA / sideB));
            let lineLength = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
            line.style.width = lineLength + "px";
            line.style.transformOrigin = "left";
            line.style.rotate = lineDegree + "deg";
            if (xRes1 > xRes2) {
                line.style.transform = "scaleX(-1)";
                if (yRes1 < yRes2) {
                    line.style.rotate = -lineDegree + "deg";
                }
            }
            else {
                line.style.transform = "scaleX(1)";
                if (yRes1 > yRes2) {
                    line.style.transform += " scaleY(-1)";
                    line.style.rotate = -lineDegree + "deg";
                }
            }
        }
        else {
            line.style.display = "none";
        }
    }, frameWait)
}

function addDot(x1, y1, z1, color) {
    let posY1 = y1;
    let posZ1 = z1;
    let posX1 = x1;
    let size = 50;

    let dot = document.createElement("div");
    dot.style.position = "absolute";

    dot.style.left = "100" + "px";
    dot.style.top = "100" + "px";
    dot.style.width = "1px";
    dot.style.height = "100px";
    dot.classList.add("dot");
    dot.classList.add("object");
    dot.style.background = color;

    //limit width near camera
    dot.style.maxHeight = "12.5px";
    dot.style.maxWidth = "12.5px";

    game.appendChild(dot);

    let drawdots = setInterval(() => {
        if (dot.classList.contains("remove")) {
            clearInterval(drawdots);
            dot.remove();
        }
        let vh = document.documentElement.clientHeight;
        let vw = document.documentElement.clientWidth;
        let distance = posZ1 - camPosZ;
        if (distance > 0) {
            dot.style.display = "block";
            let highest1 = distance / 2;

            //Determine  Y
            yRes1 = (posY1 / highest1) * (vh / 2);
            yRes1 = -yRes1 + (vh / 2);
            dot.style.top = yRes1 + "px";

            //Determine  X
            xRes1 = (posX1 / highest1) * (vw / 2);
            xRes1 = -xRes1 + (vw / 2);
            dot.style.left = xRes1 + "px";

            //Sizing based on distance
            dot.style.height = size / distance + "px";
            dot.style.width = dot.style.height;
        }
        else {
            dot.style.display = "none";
        }
    }, frameWait)
}

function addPolygon(color, posX1, posY1, posZ1,
    posX2, posY2, posZ2,
    posX3, posY3, posZ3,
    posX4, posY4, posZ4) {
    let locationData = [[posX1, posY1, posZ1],
    [posX2, posY2, posZ2],
    [posX3, posY3, posZ3],
    [posX4, posY4, posZ4]];
    let polygon = document.createElement("div");
    polygon.style.position = "absolute";
    polygon.style.background = color;
    polygon.style.width = "100%";
    polygon.style.height = "100%";
    polygon.classList.add("polygon");
    polygon.classList.add("object");
    polygon.style.clipPath = `polygon(0 0, 0 0, 0 0, 0 0)`;

    game.appendChild(polygon);

    function getScreenPos([x, y, z],vw,vh) {
        let distance = z - camPosZ;
        let highest = distance / 2;
        let ScreenPos = []

        yRes = (y / highest) * (vh / 2);
        yRes = -yRes + (vh / 2);
        yRes = (yRes / vh * 100);
        xRes = (x / highest) * (vw / 2);
        xRes = -xRes + (vw / 2);
        xRes = (xRes / vw * 100);

        ScreenPos.push(xRes);
        ScreenPos.push(yRes);

        return ScreenPos;
    }

    let drawPolygon = setInterval(() => {
        if (polygon.classList.contains("remove")) {
            clearInterval(drawPolygon);
            polygon.remove();
        }
        let distance1 = posZ1 - camPosZ;
        let distance3 = posZ3 - camPosZ;
        if (distance1 > 0 && distance3 > 0) {

            let vh = document.documentElement.clientHeight;
            let vw = document.documentElement.clientWidth;
            polygon.style.display = "block";
            polygon.style.zIndex = 100000 - distance1;

            
            let screenPositions = []
            for (let i = 0; i < 4; i++) {
                screenPositions.push(getScreenPos(locationData[i],vw,vh))
            }

            polygon.style.clipPath = `polygon(${screenPositions[0][0]}% ${screenPositions[0][1]}%,
                ${screenPositions[1][0]}% ${screenPositions[1][1]}%,
                ${screenPositions[2][0]}% ${screenPositions[2][1]}%,
                ${screenPositions[3][0]}% ${screenPositions[3][1]}%)`;
        }
        else {
            polygon.style.display = "none";
        }
    }, frameWait);
}

function clearRender() {
    camPosZ = 0;
    let allObjects = document.getElementsByClassName("object");
    for (let i = 0; i < allObjects.length; i++) {
        allObjects[i].classList.add("remove");
    }
}

function buildTunnel() {
    for (let i = 1; i < 8; i++) {
        if (i % 2 == 0) {
            addPolygon("#787878", -2, 2, i * 10, 2, 2, i * 10, 2, 2, i * 10 + 10, -2, 2, i * 10 + 10);
            addPolygon("#787878", -2, -2, i * 10, 2, -2, i * 10, 2, -2, i * 10 + 10, -2, -2, i * 10 + 10);

            addPolygon("#595959", -2, 2, i * 10 + 10, -2, 2, i * 10, -2, -2, i * 10, -2, -2, i * 10 + 10);
            addPolygon("#595959", 2, 2, i * 10 + 10, 2, 2, i * 10, 2, -2, i * 10, 2, -2, i * 10 + 10);
        }
        else {
            addPolygon("#595959", -2, 2, i * 10, 2, 2, i * 10, 2, 2, i * 10 + 10, -2, 2, i * 10 + 10);
            addPolygon("#595959", -2, -2, i * 10, 2, -2, i * 10, 2, -2, i * 10 + 10, -2, -2, i * 10 + 10);

            addPolygon("#787878", -2, 2, i * 10 + 10, -2, 2, i * 10, -2, -2, i * 10, -2, -2, i * 10 + 10);
            addPolygon("#787878", 2, 2, i * 10 + 10, 2, 2, i * 10, 2, -2, i * 10, 2, -2, i * 10 + 10);
        }
    }
}

function buildTunnelOnlyLines() {
    for (let i = 1; i < 8; i++) {
        addLine(-2, 2, i * 10, -2, -2, i * 10);
        addLine(-2, -2, i * 10, 2, -2, i * 10);
        addLine(2, -2, i * 10, 2, 2, i * 10);
        if (i < 7) {
            addLine(2, 2, i * 10, 2, 2, i * 10 + 10);
            addLine(-2, 2, i * 10, -2, 2, i * 10 + 10);
            addLine(-2, -2, i * 10, -2, -2, i * 10 + 10);
            addLine(2, -2, i * 10, 2, -2, i * 10 + 10);
        }
    }
}

function buildSFArchLine(x, y, z) {

    //inner lines of arch
    addLine(x + 1.8, y, z + 1, x + 1.8, y + 2, z + 1);
    addLine(x + 1.8, y + 2, z + 1, x + 1.5, y + 2.4, z + 1);
    addLine(x + 1.5, y + 2.4, z + 1, x - 1.5, y + 2.4, z + 1);
    addLine(x - 1.8, y + 2, z + 1, x - 1.5, y + 2.4, z + 1);
    addLine(x - 1.8, y, z + 1, x - 1.8, y + 2, z + 1);

    //middle lines of arch
    addLine(x + 2, y, z, x + 2, y + 2, z);
    addLine(x + 2, y + 2, z, x + 1.4, y + 2.7, z);
    addLine(x + 1.4, y + 2.7, z, x - 1.4, y + 2.7, z);
    addLine(x - 2, y + 2, z, x - 1.4, y + 2.7, z);
    addLine(x - 2, y, z, x - 2, y + 2, z);

    //outer lines of arch
    addLine(x + 2.4, y, z, x + 2.4, y + 1.9, z);
    addLine(x + 2.4, y + 1.9, z, x + 1.4, y + 3.1, z);
    addLine(x + 1.4, y + 3.1, z, x - 1.4, y + 3.1, z);
    addLine(x - 2.4, y + 1.9, z, x - 1.4, y + 3.1, z);
    addLine(x - 2.4, y, z, x - 2.4, y + 1.9, z);


    //inner lines between
    addLine(x + 2, y, z, x + 1.8, y, z + 1);
    addLine(x + 2, y + 2, z, x + 1.8, y + 2, z + 1);
    addLine(x + 1.4, y + 2.7, z, x + 1.5, y + 2.4, z + 1);
    addLine(x - 1.4, y + 2.7, z, x - 1.5, y + 2.4, z + 1);
    addLine(x - 2, y + 2, z, x - 1.8, y + 2, z + 1);
    addLine(x - 2, y, z, x - 1.8, y, z + 1);

    //outer lines between
    addLine(x + 2, y, z, x + 2.4, y, z);
    addLine(x + 2, y + 2, z, x + 2.4, y + 1.9, z);
    addLine(x + 1.4, y + 2.7, z, x + 1.4, y + 3.1, z);
    addLine(x - 1.4, y + 2.7, z, x - 1.4, y + 3.1, z);
    addLine(x - 2, y + 2, z, x - 2.4, y + 1.9, z);
    addLine(x - 2, y, z, x - 2.4, y, z);

}

function buildSFArchPolygon(x, y, z) {
    addPolygon("#898989", x + 1.8, y, z + 1, x + 1.8, y + 2, z + 1, x + 2, y + 2, z, x + 2, y, z);
    addPolygon("#FFA500", x + 1.8, y + 2, z + 1, x + 1.5, y + 2.4, z + 1, x + 1.4, y + 2.7, z, x + 2, y + 2, z);
    addPolygon("#343434", x + 1.5, y + 2.4, z + 1, x - 1.5, y + 2.4, z + 1, x - 1.4, y + 2.7, z, x + 1.4, y + 2.7, z);
    addPolygon("#FFA500", x - 1.8, y + 2, z + 1, x - 1.5, y + 2.4, z + 1, x - 1.4, y + 2.7, z, x - 2, y + 2, z);
    addPolygon("#898989", x - 1.8, y, z + 1, x - 1.8, y + 2, z + 1, x - 2, y + 2, z, x - 2, y, z);

    addPolygon("#7f7f7f", x + 2, y, z, x + 2, y + 2, z, x + 2.4, y + 1.9, z, x + 2.4, y, z);
    addPolygon("#7f7f7f", x + 2, y + 2, z, x + 1.4, y + 2.7, z, x + 1.4, y + 3.1, z, x + 2.4, y + 1.9, z);
    addPolygon("#7f7f7f", x + 1.4, y + 2.7, z, x - 1.4, y + 2.7, z, x - 1.4, y + 3.1, z, x + 1.4, y + 3.1, z);
    addPolygon("#7f7f7f", x - 2, y + 2, z, x - 1.4, y + 2.7, z, x - 1.4, y + 3.1, z, x - 2.4, y + 1.9, z);
    addPolygon("#7f7f7f", x - 2, y, z, x - 2, y + 2, z, x - 2.4, y + 1.9, z, x - 2.4, y, z);
}

function initLines() {
    buildTunnelOnlyLines();
    for (let i = 0; i < 5; i++) {
        buildSFArchLine(Math.random() * 2 - 1, groundY, i * 25 + 95);
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 7; j++) {
            addDot((j * (Math.random() * 5)) - 10, groundY, i * (Math.random() * 20) + 75, "#FFFFFF");
        }
    }
}

function initPolygons() {
    buildTunnel();

    for (let i = 0; i < 5; i++) {
        buildSFArchPolygon(Math.random() * 2 - 1, groundY, i * 25 + 95);
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 7; j++) {
            addDot((j * (Math.random() * 5)) - 10, groundY, i * (Math.random() * 20) + 75, "#005500");
        }
    }

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
    }, frameWait)
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
    }, frameWait)
    game.appendChild(ground);
}

let updateScreen = setInterval(() => {
    if (autoMove) {
        if (movingForward) {
            camPosZ += 0.2;
            if (camPosZ > 175) {
                movingForward = false;
            }
        }
        else {
            camPosZ -= 0.2;
            if (camPosZ < 10) {
                movingForward = true;
            }
        }
    }
}, frameWait);