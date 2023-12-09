// // Get size of parent div
// var canvasDiv = document.getElementById("test-container");
// console.log(canvasDiv.offsetWidth);
// var total_width = canvasDiv.offsetWidth;
// var total_height = total_width;

// axis
let origin;
let x_axis;
let y_axis;

// Curve
let nx; // Unit cell along x 
let x_arr;
let y_arr;

function setup() {
  // Get size of parent div
  var canvasDiv = document.getElementById("test-container");
  total_width = canvasDiv.offsetWidth;
  total_height = total_width * 9 / 16;

  // Setup axis
  origin = createVector(0.1 * total_width, 0.9 * total_height);
  x_axis = createVector(0.8 * total_width, 0);
  y_axis = createVector(0, - 0.8 * total_height);

  // Setup the curve
  nx = 1000;
  x_arr = makeArr(0.15 * total_width, 0.85 * total_width, nx);

  y_min = 0.85 * total_height;
  y_max = 0.2 * total_width;

  // y_arr1 = getGaussian(x_arr, y_min, y_max, 0.3 * total_width, 0.05 * total_width);
  // y_arr2 = getGaussian(x_arr, y_min, y_max, 0.7 * total_width, 0.05 * total_width);
  y_arr1 = getGaussian(x_arr, y_min, y_max, 0.275 * total_width, 0.035 * total_width);
  y_arr2 = getGaussian(x_arr, y_min, y_max, 0.725 * total_width, 0.035 * total_width);

  // var sketchCanvas = createCanvas(width, 450);
  // Create canvas in the specific div
  var canvas = createCanvas(total_width, total_height);
  canvas.parent('sketch-holder-graph')

  noLoop();
}

function draw() {

  background(255);

  // Draw axis
  stroke("black");
  strokeWeight(3);
  line(origin.x, origin.y, origin.x + x_axis.x, origin.y + x_axis.y);
  line(origin.x, origin.y, origin.x + y_axis.x, origin.y + y_axis.y);
  // Triangle as arrowhead
  noStroke();
  fill("black");
  triangle(origin.x + x_axis.x, origin.y + x_axis.y + 10,
    origin.x + x_axis.x + 20, origin.y + x_axis.y + 0,
    origin.x + x_axis.x, origin.y + x_axis.y - 10);
  triangle(origin.x + y_axis.x - 10, origin.y + y_axis.y,
    origin.x + y_axis.x, origin.y + y_axis.y - 20,
    origin.x + y_axis.x + 10, origin.y + y_axis.y);

  // Draw curve
  stroke("grey");
  noFill();
  beginShape();
  for (let ix = 0; ix < nx; ix++) {
    vertex(x_arr[ix], (y_arr1[ix] + y_arr2[ix]) / 2);
  }
  endShape();

  // Draw vertical lines
  stroke("grey");
  strokeWeight(2.5);
  drawingContext.setLineDash([10, 10]);
  line(0.4 * total_width, origin.y, 0.4 * total_width + y_axis.x, origin.y + y_axis.y);
  line(0.6 * total_width, origin.y, 0.6 * total_width + y_axis.x, origin.y + y_axis.y);

  // Add text
  noStroke();
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(14);
  // strokeWeight(5);

  text("Simple", origin.x + 30, origin.y + x_axis.y + 20);
  text("Complex", origin.x + x_axis.x - 30, origin.y + x_axis.y + 20);

  textSize(18);
  // textStyle(BOLD);
  // text("Beauty", origin.x + x_axis.x / 2, origin.y + x_axis.y + 20);
  translate(origin.x - 20, origin.y + y_axis.y / 2);
  rotate(- PI / 2.0);
  text("Satisfaction", 0, 0);






}


function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}

function getGaussian(x_arr, y_min, y_max, mu, sigma) {
  var y_arr = [];
  for (let ix = 0; ix < nx; ix++) {
    y_arr[ix] = y_min + 2.5 * (y_max - y_min) * Math.exp(-0.5 * Math.pow((x_arr[ix] - mu) / sigma, 2));
    // console.log(Math.pow((x_arr[ix] - mu) / sigma, 2));
  }
  return y_arr;
}



