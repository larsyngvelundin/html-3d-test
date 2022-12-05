let game = document.getElementById("game");
document.body.style.background = "#000000";
let frameWait = 16;
let autoMove = false;
let movingForward = true;
frameWait = 16;
let camPosZ = 0.0;
let camPosX = 10.0;
let camRotY = 0;
let fov = 60;
let groundY = -1.5;

//instructions
let test = document.createElement("div");
test.style.backgroundColor = "#00FF00";
test.style.position = "absolute";
test.style.transform = "translate(-50%, -50%)";
test.style.left = "50%";
test.style.top = "50%";
test.style.height = "20px";
test.style.width = "20px";
game.appendChild(test);

let cam = document.createElement("div");
cam.style.backgroundColor = "#ffffff";
cam.style.width = "20px";
cam.style.height = "20px";
cam.style.position = "absolute";
cam.style.transform = "translate(-50%, -50%)";
cam.style.left = "50%";
cam.style.top = "50%";
cam.style.transformOrigin = "50% 50%"
game.appendChild(cam);


let sidePanel1 = document.createElement("div");
sidePanel1.style.backgroundColor = "#ffffff";
sidePanel1.style.width = "2px";
sidePanel1.style.height = "500px";
sidePanel1.style.position = "absolute";
sidePanel1.style.left = "50%";
sidePanel1.style.bottom = "50%";
sidePanel1.style.transform = "rotate(" + (camRotY + fov / 2) + "deg)";
sidePanel1.style.transformOrigin = "50% 100%"
game.appendChild(sidePanel1);
let sidePanel2 = document.createElement("div");
sidePanel2.style.backgroundColor = "#ffffff";
sidePanel2.style.width = "2px";
sidePanel2.style.height = "500px";
sidePanel2.style.position = "absolute";
sidePanel2.style.left = "50%";
sidePanel2.style.bottom = "50%";
sidePanel2.style.transform = "rotate(" + (camRotY - fov / 2) + "deg)";
sidePanel2.style.transformOrigin = "50% 100%"
game.appendChild(sidePanel2);

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
            camRotY -= 10;
            break;
        case "d":
        case "D":
            camRotY += 10;
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


let cameraUpdate = setInterval(() => {
    cam.style.transform = "translate(-50%, -50%) rotate(" + camRotY + "deg) ";
    sidePanel2.style.transform = "rotate(" + (camRotY - fov / 2) + "deg)";
    sidePanel1.style.transform = "rotate(" + (camRotY + fov / 2) + "deg)";
}, frameWait)



//create objects
//if inside view, backgroundcolor = green