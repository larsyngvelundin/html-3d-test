import addPolygon from "../addPolygon.js";

export default function createArch(x, y, z) {
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