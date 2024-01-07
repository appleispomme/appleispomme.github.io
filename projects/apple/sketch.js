// // Get size of parent div
// var canvasDiv = document.getElementById("test-container");
// console.log(canvasDiv.offsetWidth);
// var total_width = canvasDiv.offsetWidth;
// var total_height = total_width;

// Variables for canvas
let total_width = 512;
let total_height = 512;

// Variables for 2D array
let nx; // Unit cell along x 
let ny;  // Unit cell along y
let unit_width;
let unit_height;
let grid;
let distances;         // Future 2D array, storing the distances

// // Variables for 2D array
// let nx = 20; // Unit cell along x 
// let ny = 20; // Unit cell along y
// let unit_width = total_width / nx;
// let unit_height = total_width / ny;
// let grid;
// let distances;         // Future 2D array, storing the distances

// let img;
// let mk;
// let c; // color array

function setup() {
  // Get size of parent div
  var canvasDiv = document.getElementById("test-container");
  total_width = 0.8 * canvasDiv.offsetWidth;
  total_height = total_width;

  console.log(canvasDiv.offsetWidth);
  console.log(total_width);

  // variables for 2d array

  // Variables for 2D array
  nx = 20; // Unit cell along x 
  ny = 20; // Unit cell along y
  unit_width = total_width / nx;
  unit_height = total_width / ny;


  // var sketchCanvas = createCanvas(width, 450);
  // Create canvas in the specific div
  var canvas = createCanvas(total_width, total_height);
  canvas.parent('sketch-holder-apple');

  grid = get_grid_coordinates(nx, ny);

  // Prepare image for small apples
  img = createGraphics(width, height);
  img.noStroke();
  // Draw big apple as a mask
  mk = createGraphics(width, height);
  build_apple(width / 2, height / 2, width / 2, 1.2, 0.15, 0.08, mk);

  // Specify colors included in the gradient
  c = [color(174, 255, 144),
  color(245, 255, 128),
  color(255, 167, 100),
  color(240, 37, 25)];

  // noLoop();
}

function draw() {
  // Get mouse and distance
  let xc = mouseX;
  let yc = mouseY;
  // xc = 0.3 * width;
  // yc = 0.3 * height;

  background(255);
  // Draw all small apples

  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < ny; j++) {
      let my_dist = dist(grid[i][j][0], grid[i][j][1], xc, yc)
      let my_color = get_color(c, my_dist / (0.65 * width));

      img.fill(my_color);
      build_apple(grid[i][j][0], grid[i][j][1], unit_width / 2, 1.2, 0.15, 0.08, img);
    }
  }

  // Build the final image
  // image(img.mask(mk));
  imgClone = img.get();
  imgClone.mask(mk.get());
  image(imgClone, 0, 0);
}

function build_apple(x0, y0, a, b, p, q, img) {
  let t = makeArr(- PI / 2, 3 * PI / 2, 100);
  img.beginShape();
  for (let i = 0; i < t.length; i++) {
    let R = a * (1 - Math.sin(t[i]));
    let x = x0 + R * Math.exp(-p * Math.pow(t[i] - PI / 2, 2)) * Math.cos(t[i]);
    let y = y0 - a / 2 - b * R * Math.exp(-q * Math.pow(t[i] - PI / 2, 2)) * Math.sin(t[i]);
    vertex(x, y);
  }
  img.endShape(CLOSE);

}

function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}

function get_grid_coordinates(nx, ny) {
  /*
  Create a grid of nx by ny points within the canvas (width, height).  
  */
  let grid = [];
  let unit_width = width / nx;
  let unit_height = height / ny;

  for (let ix = 0; ix < nx; ix++) {
    grid[ix] = [];
    let x = (ix + 0.5) * unit_width;
    for (let iy = 0; iy < ny; iy++) {
      let y = (iy + 0.5) * unit_height;
      // grid[ix][iy] = [x, y];
      grid[ix][iy] = [x, y];
    }
  }
  return grid
}

function get_color(c, ratio) {
  ratio = ratio * 4;
  if (ratio < 1) {
    return lerpColor(c[0], c[1], ratio)
  } else if (ratio < 2) {
    return lerpColor(c[1], c[2], ratio - 1)
  } else {
    return lerpColor(c[2], c[3], ratio - 2)
  }
}

// function compute_distance_and_angle(grid, xc, yc) {
//   let distances = [];
//   let angles = [];
//   for (let ix = 0; ix < nx; ix++) {
//     distances[ix] = [];
//     angles[ix] = [];
//     for (let iy = 0; iy < ny; iy++) {
//       let y = (iy + 0.5) * unit_height;
//       distances[ix][iy] = dist(grid[ix][iy][0], grid[ix][iy][1], xc, yc);
//       angles[ix][iy] = Math.atan2(grid[ix][iy][1] - yc, grid[ix][iy][0] - xc);
//     }
//   }
//   return [distances, angles]
// }