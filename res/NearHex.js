import {Units} from "./Units.js";

export class NearHex {

    static getOffsetDirection(isOffset, direction){

        let offsets =  [
            [
                [0, -1],[+1, 0],[0, +1],[-1, +1],[-1, 0],[-1, -1]
            ],
            [
                [+1, -1],[+1, 0],[+1, +1],[0, +1],[-1, 0],[0, -1]
            ],
        ];

        return offsets[isOffset][direction];
    };

    /**
     * @param {Units.Hex} hex The date
     * @param {int} direction The string
     */
    static getNearHexByDirection = (hex, direction) => {
        var isOffset = hex.r & 1;
        var offset = this.getOffsetDirection(isOffset, direction);
        var hexf = Units.Hex(hex.r + offset[1], hex.q + offset[0]);
        return hexf
    };

    /**
     * @param {Units.Hex} hex The date
     */
    static getNears = (hex,gameMap) => {
        let nearHexes = [];
        for (let direction = 0; direction <= 5; direction++) {
            let nearHex = this.getNearHexByDirection(hex, direction);

            // Is the neighbor on/in the map?
            if (nearHex.q >= 0 && nearHex.r >= 0
                && nearHex.q < gameMap.getSize().q && nearHex.r < gameMap.getSize().r) {

                if (!gameMap.getHexes()[nearHex.r][nearHex.q].collision) {
                    nearHexes.push(nearHex); // add an edge to the graph
                }
            }
        }
        return nearHexes;
    };
}