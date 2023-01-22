export default function addLine(x1, y1, z1, x2, y2, z2){
    let game = document.getElementById("game");

    let line = document.createElement("div");
    line.style.position = "absolute";

    line.style.left = "-100" + "px";
    line.style.top = "-100" + "px";
    line.style.width = "1px";
    line.style.height = "1px";
    line.classList.add("line");
    line.classList.add("object");
    
    //Limit size close to cmaera
    line.style.maxHeight = "12.5px";

    line.dataset.x1 = x1;
    line.dataset.y1 = y1;
    line.dataset.z1 = z1;
    line.dataset.x2 = x2;
    line.dataset.y2 = y2;
    line.dataset.z2 = z2;

    game.appendChild(line);
}