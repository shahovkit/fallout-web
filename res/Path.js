/**
 * http://www.redblobgames.com/pathfinding/a-star/introduction.html
 * http://www.redblobgames.com/pathfinding/a-star/implementation.html
  */

import {PriorityQueue} from "./PriorityQueue.js";
import {HexMath} from "./HexMath.js";
import {NearHex} from "./NearHex.js";



export class Path
{
    static finalPathNeighbors = [];
    static finalPath = [];

    //get "to" hexes
    static getIndexHexes(cames) {
        const hexes = [];
        for (let h = 0; h < came.length; h++) {
            hexes.push(came[h].to);
        }
        return hexes;
    }


    //find hex from came to current hex
    static findFromHex(cames, hex) {
        for (let h = 0; h < cames.length; h++) {
            if (HexMath.hexEqual(cames[h].to, hex)) {
                return cames[h];
            }
        }
        return undefined;
    }

    /**
     *
     * @param {object} start
     * @param goal
     * @returns array
     */
    static findPath(start, goal) {
        // if(debug == true){
        //   debugger;
        // }
        this.finalPathNeighbors = [];
        //time = performance.now();
        const frontier = new PriorityQueue();  // List of the places to explore next
        const came = [];// List of where we've already been - "from" and The price we paid to go there - "cost"
        let found = false;

        frontier.push(start, 0);
        came.push({to: start, from: start, cost: 0});

        while (frontier.length() > 0) {

            const current = frontier.pop();
            //const currentHex = map[current.q][current.r];

            const nears = NearHex.getNears(current);

            // Early exit (stop exploring map when goal is reached)
            if (HexMath.hexEqual(current, goal)) {
                found = true;
                break;
            }

            for (let n = 0; n < nears.length; n++) {

                let next = nears[n],
                    newCost = (Path.findFromHex(came, current).cost + 1);//, //plus one step
                //distance = HexMath.offsetDistance(goal, next);

                let eurist = newCost;// + distance;
                if (Path.findFromHex(came, next) === undefined || newCost < Path.findFromHex(came, next).cost) {
                    this.finalPathNeighbors.push([next, eurist]);
                    frontier.push(next, eurist);
                    came.push({to: next, from: current, cost: newCost});
                }
            }
        }

        // BUILD PATH BACK FROM GOAL
        if (goal && found) {
            let current = goal;
            let path = [goal];

            while (!HexMath.hexEqual(current, start)) {
                current = Path.findFromHex(came, current).from;
                path.push(current);
            }
            //time = performance.now() - time;
            return path.reverse();

        } else {
            return undefined;
        }

    }

}