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

function  getPercentage(cost, min, max) {
  return (cost-min)/(max-min)*100
}
