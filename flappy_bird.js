const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 320;
canvas.height = 480;

// Bird settings
const birdWidth = 30;
const birdHeight = 30;
let birdX = 50;
let birdY = canvas.height / 2;
let birdSpeed = 0;
const gravity = 0.6;
const lift = -15;

// Pipe settings
const pipeWidth = 50;
const pipeGap = 100;
let pipeX = canvas.width;
let pipeY = Math.floor(Math.random() * (canvas.height - pipeGap));
const pipeSpeed = 2;

// Game settings
let gameOver = false;
let score = 0;

// Bird controls
document.addEventListener('keydown', () => {
  if (!gameOver) {
    birdSpeed = lift;
  } else {
    resetGame();
  }
});

// Update game elements
function updateGame() {
  if (!gameOver) {
    birdSpeed += gravity;
    birdY += birdSpeed;

    // Pipe movement
    pipeX -= pipeSpeed;
    if (pipeX + pipeWidth < 0) {
      pipeX = canvas.width;
      pipeY = Math.floor(Math.random() * (canvas.height - pipeGap));
      score++;
    }

    // Collision detection
    if (birdY + birdHeight > canvas.height || birdY < 0) {
      gameOver = true;
    }

    // Pipe collision detection
    if (birdX + birdWidth > pipeX && birdX < pipeX + pipeWidth) {
      if (birdY < pipeY || birdY + birdHeight > pipeY + pipeGap) {
        gameOver = true;
      }
    }
  }

  // Draw everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  drawPipes();
  drawScore();
  if (gameOver) {
    drawGameOver();
  }
}

// Draw the bird
function drawBird() {
  ctx.fillStyle = '#FFD700';
  ctx.fillRect(birdX, birdY, birdWidth, birdHeight);
}

// Draw pipes
function drawPipes() {
  ctx.fillStyle = '#228B22';
  ctx.fillRect(pipeX, 0, pipeWidth, pipeY); // Top pipe
  ctx.fillRect(pipeX, pipeY + pipeGap, pipeWidth, canvas.height - pipeY - pipeGap); // Bottom pipe
}

// Draw the score
function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Draw game over screen
function drawGameOver() {
  ctx.fillStyle = '#000';
  ctx.font = '30px Arial';
  ctx.fillText('Game Over', 90, 200);
  ctx.font = '20px Arial';
  ctx.fillText('Press any key to restart', 80, 250);
}

// Reset the game
function resetGame() {
  birdY = canvas.height / 2;
  birdSpeed = 0;
  pipeX = canvas.width;
  pipeY = Math.floor(Math.random() * (canvas.height - pipeGap));
  score = 0;
  gameOver = false;
}

// Main game loop
function gameLoop() {
  updateGame();
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
