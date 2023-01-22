export default function clearRender() {
    let game = document.getElementById("game");
    game.dataset.camPosZ = 0;
    // let allObjects = document.getElementsByClassName("object");
    // console.log(allObjects);
    // for (let i = 0; i < allObjects.length; i++) {
    //     allObjects[i].classList.add("remove");
    // }

    let toBeRemoved = document.getElementsByClassName("object");
    for (let i = toBeRemoved.length - 1; i >= 0; i--) {
        toBeRemoved[i].remove();
    }
}