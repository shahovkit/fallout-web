import {Units} from "./Units.js";

export class Graphics
{

    //get coord corner dot hex by count
    static hex_corners(center, size, corners) {

    var coords = [];
    for (let i = 1; i <= corners; i++) {
        var angle_deg = 60 * i - 30;
        var angle_rad = Math.PI / 180 * angle_deg;
        coords.push(Units.Point(center.x + size.x * Math.cos(angle_rad),
            center.y + size.y * Math.sin(angle_rad)));
    }
    return coords;
};
}