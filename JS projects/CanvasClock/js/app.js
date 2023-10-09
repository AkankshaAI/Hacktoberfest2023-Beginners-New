// Create the canvas object
var canvas = document.getElementById("canvas");

// Create the 2d drawing object
var ctx = canvas.getContext("2d");

// Calculate the clock radius, using height of the canvas
var radius = canvas.height / 2;

// Remap the (0, 0) position of the drawing object to the center of canvas
ctx.translate(radius, radius);

// Reduce the clock radius to 90% to draw the clock inside the canvas
radius = radius * 0.9;
// console.log(radius);

// drawClock();
setInterval(drawClock, 1000);

// function to draw the clock
function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

// function to draw the face of clock
function drawFace(ctx, radius) {
  var gradient;
  // Draw the white clock
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  // Create the radial gradient (95% and 105% of original clock radius)
  gradient = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  // console.log(gradient);

  // Create 3 color stops, corresponding with the inner, middle and outer edge of the arc
  gradient.addColorStop(0, "#333");
  gradient.addColorStop(0.5, "white");
  gradient.addColorStop(1, "#333");

  // Define the gradient as the stroke style of the drawing object
  ctx.strokeStyle = gradient;

  // Define the line width of the drawing object (10% of radius)
  ctx.lineWidth = radius * 0.1;

  // Draw the circle
  ctx.stroke();

  // Draw the clock center
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

// Draw the numbers
function drawNumbers(ctx, radius) {
  var angle;
  var num;
  // Set the font size of the drawing object to 15% of the radius
  ctx.font = radius * 0.15 + "px arial";

  // Set the text alignment to the center and the middle of the print position
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  // Calculate the print position for 12 numbers to 85% of the radius, rotated (PI/6) for each number
  for (num = 1; num < 13; num++) {
    angle = (num * Math.PI) / 6;
    // console.log(angle);
    ctx.rotate(angle);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-angle);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(angle);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-angle);
  }
}

function drawTime(ctx, radius) {
  var currTime = new Date();
  var hours = currTime.getHours();
  var minutes = currTime.getMinutes();
  var seconds = currTime.getSeconds();

  // Draw the angle of the hour hand and draw its length of 50% radius and width of 7% radius
  hours = hours % 12;
  hours =
    (hours * Math.PI) / 6 +
    (minutes * Math.PI) / (6 * 60) +
    (seconds * Math.PI) / (360 * 60);
  drawHand(ctx, hours, radius * 0.5, radius * 0.07);

  // Draw the angle of the minute hand and draw its length of 80% radius and width of 7% radius
  minutes = (minutes * Math.PI) / 30 + (seconds * Math.PI) / (30 * 60);
  drawHand(ctx, minutes, radius * 0.8, radius * 0.07);

  // Draw the angle of the second hand and draw its length of 90% radius and width of 2% radius
  seconds = (seconds * Math.PI) / 30;
  drawHand(ctx, seconds, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, position, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(position);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-position);
}
