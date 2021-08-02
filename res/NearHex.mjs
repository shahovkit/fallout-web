import {Units} from "./Units.mjs";
import {GameMap} from "./GameMap.mjs";

export class NearHex {

    static getOffsetByDirection(isOffset, direction) {

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

    //todo
    static getDirectionByOffset(isOffset, offset) {

        let offsets =  [
            [
                [0, -1],[+1, 0],[0, +1],[-1, +1],[-1, 0],[-1, -1]
            ],
            [
                [+1, -1],[+1, 0],[+1, +1],[0, +1],[-1, 0],[0, -1]
            ],
        ];

        let direction = 0;

        offsets[isOffset].forEach((value,key) => {
            if(value[0] === offset[0] && value[1] === offset[1]){
                direction = key;
            }
        });

        return direction;

        //return offsets[isOffset].findIndex((value,key) => {
        //    return value[0] === offset[0] && value[1] === offset[1];
        //});
    };

    static calcOffset(currentHex, nextHex) {
        return [nextHex.r -currentHex.r, nextHex.q - currentHex.q];
    }

    /**
     * @param {Units.Hex} hex The date
     * @param {int} direction The string
     */
    static getNearHexByDirection(hex, direction) {
        var isOffset = hex.r & 1;
        var offset = this.getOffsetByDirection(isOffset, direction);
        var hexf = Units.Hex(hex.r + offset[1], hex.q + offset[0]);
        return hexf
    };

    /**
     * @param {Units.Hex} hex The date
     */
    static getNears(hex) {
        let nearHexes = [];
        for (let direction = 0; direction <= 5; direction++) {
            let nearHex = this.getNearHexByDirection(hex, direction);

            // Is the neighbor on/in the map?
            if (nearHex.q >= 0 && nearHex.r >= 0
                && nearHex.q < GameMap.getInstance().getSize().q && nearHex.r < GameMap.getInstance().getSize().r) {

                if (!GameMap.getInstance().getHexes()[nearHex.r][nearHex.q].collision) {
                    nearHexes.push(nearHex); // add an edge to the graph
                }
            }
        }
        return nearHexes;
    };
}