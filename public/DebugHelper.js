function percentToHEXColor(percent) {
  if (percent === 100) {
    percent = 99
  }
  var r, g, b;


  // yellow to red
  b = Math.floor(255 * (( percent % 100) / 100));
  g = 0;
  r = 0;

  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function arrayMin(arr, number) {
  var len = arr.length, min = arr[0][number];
  while (len--) {
    if (arr[len][number] < min) {
      min = arr[len][number];
    }
  }
  return min;
};

function arrayMax(arr, number) {
  var len = arr.length, max = arr[0][number];
  while (len--) {
    if (arr[len][number] > max) {
      max = arr[len][number];
    }
  }
  return max;
};

const getPercentage = (cost, min, max)=>((cost-min)/(max-min)*100);
