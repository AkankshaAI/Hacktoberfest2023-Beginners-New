

const horizontalSquare = width / smallSquareSize;
const verticalSquare = height / smallSquareSize;

mapColor = '#000000'



function drawMap() {
    ctx.fillStyle = mapColor
    ctx.fillRect(0, 0, width, height)
 
}

function drawItems() {
  // Implement drawItems logic here
}

function moveSnake() {
  // Implement moveSnake logic here
}

function drawSnake() {
  // Implement drawSnake logic here
}

function updateScore() {
  // Implement updateScore logic here
}

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * smallSquareSize, y * smallSquareSize, smallSquareSize, smallSquareSize);

  ctx.strokeStyle = mapColor;
  ctx.strokeRect(x * smallSquareSize, y * smallSquareSize, smallSquareSize, smallSquareSize);
}

function frame() {
  // drawMap();
  // drawItems();
  // moveSnake();
  // drawSnake();
  // updateScore();

//   if (hitWall() || hitSelf()) {
//     clearInterval(gameLoop);
//   }

//   gameOver();
}

drawSquare(16, 15, 'blue');

gameLoop = setInterval(frame, fps);
