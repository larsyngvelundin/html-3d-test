export default function drawLines() {
    let allLines = document.getElementsByClassName("line");
    for (let line in allLines) {
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
            let yRes1 = 50 * vh / 100;

            let highest1 = distance / 2;
            let highest2 = distance2 / 2;

            //Determine Start Y
            yRes1 = (posY1 / highest1) * (vh / 2);
            yRes1 = -yRes1 + (vh / 2);
            line.style.top = yRes1 + "px";
            let yRes2 = (posY2 / highest2) * (vh / 2);
            yRes2 = -yRes2 + (vh / 2);

            //Determine Start X
            let xRes1 = (posX1 / highest1) * (vw / 2);
            xRes1 = -xRes1 + (vw / 2);
            line.style.left = xRes1 + "px";
            let xRes2 = (posX2 / highest2) * (vw / 2);
            xRes2 = -xRes2 + (vw / 2);

            //Sizing based on distance
            line.style.height = size / distance + "px";
            line.style.width = line.style.height;

            //calculate width/rotation to reach second coordinate
            let sideA = Math.abs(xRes1 - xRes2);
            let sideB = Math.abs(yRes1 - yRes2);
            let lineDegree = radiansToDegrees(arcctg(sideA / sideB));
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
    }
}