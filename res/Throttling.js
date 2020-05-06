// THROTTLING
// from: http://sampsonblog.com/749/simple-throttle-function

class Throttle {
  constructor(callback, limit){              // We return a throttled function
    this.wait = false;
    if (!this.wait) {                  // If we're not waiting
      callback.call();          // Execute users function
      this.wait = true;              // Prevent future invocations
      setTimeout(function () {  // After a period of time
        this.wait = false;         // And allow future invocations
      }, limit);
    }
  }
}
