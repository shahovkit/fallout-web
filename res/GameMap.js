import {ArrayHelper} from "./ArrayHelper.js";
import {Constants} from "./Constants.js";
import {Units} from "./Units.js";

export class GameMap
{
    hexes = [];

    size = {r: 0, q: 0};

    collision = [];

    static instance;

    static getInstance(){
        if( typeof(this.instance) === "undefined"){
            this.instance = new this();
        }
        return this.instance
    }

     constructor(){
         if( typeof(this.instance) !== "undefined"){
             throw new Error("Object already exist, use getInstance() instead new")
         }
        this.instance = this;
        this.init();

    }

    isNotCollision(hex){
        return this.getHexes()[hex.r][hex.q].collision === false;
    }

    getHexes(){
        return this.hexes;
    }
    
    setSize(r, q){
        this.size = {
            r: r,
            q: q
        }
    }

    getSize(){
        return this.size
    }

    setCollision(arrayCollisions){
        this.collision = arrayCollisions;
    }

    getCollision(){
        return this.collision;
    }

    initCollision(){
        for (let r = 0; r < this.getSize().r; r++) {
            for (let q = 0; q < this.getSize().q; q++) {

                let isCollision = false;

                let issetElement = typeof(this.getCollision()[r]) != "undefined"
                    && typeof(this.getCollision()[r][q]) != "undefined";

                if(issetElement){
                    isCollision = (this.getCollision()[r][q]===1);
                }

                this.hexes[r][q] = {collision: isCollision};
            }
        }
    }

    init(){
        this.setSize(Constants.mapSize.r, Constants.mapSize.q);

        this.hexes = ArrayHelper.multiArray(this.getSize().r, this.getSize().q);

        this.setCollision([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0]
        ]);

        this.initCollision();

    }

    static findHexMap(hex) {
        if (GameMap.getInstance().getHexes()[hex.r]) {
            return GameMap.getInstance().getHexes()[hex.r][hex.q];
        } else {
            return undefined;
        }
    }

}