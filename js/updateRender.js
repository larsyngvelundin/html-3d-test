import renderPolygons from "./renderPolygons.js";

export default function updateRender() {
    let polygons = document.getElementsByClassName("polygon");
    renderPolygons(polygons);
}