//Helper
export class H {
    static isset(variable) {
        return typeof (variable) !== "undefined" && variable !== null
    }

    static randomByInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static getPlayerById(id, players) {
        return players.filter(obj => {
            return obj.id === id;
        })[0];
    }

    static removeObjByProp(object, property, value) {
        for (let i = object.length - 1; i >= 0; --i) {
            if (object[i][property] === value) {
                object.splice(i, 1);
            }
        }

        return object;
    };
}