export class ArrayHelper
{
    // ARRAY SHUFFLE
    // From: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    static shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    issetDuo(){

    }

    static multiArray(y, x) {
        return Array(...Array(y)).map(() => Array(x))
    }

    static arrayMin(arr, number) {
        var len = arr.length, min = arr[0][number];
        while (len--) {
            if (arr[len][number] < min) {
                min = arr[len][number];
            }
        }
        return min;
    }

    static arrayMax(arr, number) {
        var len = arr.length, max = arr[0][number];
        while (len--) {
            if (arr[len][number] > max) {
                max = arr[len][number];
            }
        }
        return max;
    }

}