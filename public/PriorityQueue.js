// PRIORITY QUEUE
// From: https://jsfiddle.net/GRIFFnDOOR/r7tvg/
// Savagely adapted/mangled!

export class PriorityQueue
{
    heap = [];

    constructor(arr) {
        if (arr) for (i=0; i< arr.length; i++)
            this.heap.push(arr[i][0], arr[i][1]);
    }

    logHeap() {
        let output = "HEAP - "
        for (let i = 0; i < this.heap.length; i++) {
            output += "[" + this.heap[i][0] +  " / " + this.heap[i][1] + "]";
        }
        console.log(output);
    }

    length() {
        return this.heap.length;
    }

    push(data, priority) {
        var node = [data, priority];
        this.bubble(this.heap.push(node) - 1);
    }

    // removes and returns the data of lowest priority
    pop() {
        return this.heap.pop()[0];
    }

    // removes and returns the data of highest priority
    popHigh() {
        return this.heap.shift()[0];
    }

    // bubbles node i up the binary tree based on
    // priority until heap conditions are restored
    bubble(i) {
        while (i > 0) {
            // var parentIndex = i >> 1; // <=> floor(i/2)	// legacy code
            var parentIndex = i - 1;

            // if equal, no bubble (maintains insertion order)
            if (!this.isHigherPriority(i, parentIndex)) break;

            this.swap(i, parentIndex);
            i = parentIndex;
        }
    }

    // swaps the addresses of 2 nodes
    swap(i,j) {
        var temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    // returns true if node i is higher priority than j
    isHigherPriority(i,j) {
        return this.heap[i][1] > this.heap[j][1];
    }

}