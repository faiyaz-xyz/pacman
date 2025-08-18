// BOARD

let board;
const rowCount = 21;
const colCount = 30;
const tileSize = 32;
const boardWidth = colCount * tileSize;
const boardHeight = rowCount * tileSize;
let context;

// IMAGES
let pinkGhostImage;
let blueGhostImage;
let orangeGhost;
let redGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;

window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  loadImages();
  loadMap();
  // console.log(walls.size);
  // console.log(foods.size);
  // console.log(ghosts.size);
  update();
};

// X = wall, O = empty space, P = pac man, " " = food
// Ghosts:- b = blue, o = orange, p = pink, r = red

const tileMap = [
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "X             XX             X",
  "X X XXX X XXX XX XXX X XXX X X",
  "X                            X",
  "XXX X X XXX XXXXXX XXX X X XXX",
  "X       X            X       X",
  "XXXXXXX XXX XXXXXX XXX XXXXXXX",
  "0000X    X          X    X0000",
  "XXXXXXX  X  XXXrXX  X  XXXXXXX",
  "O        X  Xbpo X  X        O",
  "XXX XXX  XX XXXXXX XX  XXX XXX",
  "0000X    X    XX    X    X0000",
  "XXX XXX  XX XXXXXX XX  XXX XXX",
  "X       X     XX     X       X",
  "XXX X X XXX XXXXXX XXX X X XXX",
  "X X XXX X XXX XX XXX X XXX X X",
  "X                            X",
  "X       X            X       X",
  "X XXX XXX XXXXXXXXXX XXX XXX X",
  "X             XX             X",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
];

const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman;

function loadImages() {
  wallImage = new Image();
  wallImage.src = "./images/wall.png";

  pinkGhostImage = new Image();
  pinkGhostImage.src = "./images/pinkGhost.png";
  blueGhostImage = new Image();
  blueGhostImage.src = "./images/blueGhost.png";
  redGhostImage = new Image();
  redGhostImage.src = "./images/redGhost.png";
  orangeGhostImage = new Image();
  orangeGhostImage.src = "./images/orangeGhost.png";

  pacmanUpImage = new Image();
  pacmanUpImage.src = "./images/pacmanUp.png";
  pacmanDownImage = new Image();
  pacmanDownImage.src = "./images/pacmanDown.png";
  pacmanLeftImage = new Image();
  pacmanLeftImage.src = "./images/pacmanLeft.png";
  pacmanRightImage = new Image();
  pacmanRightImage.src = "./images/pacmanRight.png";
}

function loadMap() {
  walls.clear();
  foods.clear();
  ghosts.clear();

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; r < colCount; c++) {
      const row = tileMap[r];
      const tileMapChar = row[c];

      const x = c * tileSize;
      const y = r * tileSize;

      if (tileMapChar == "X") {
        const wall = new Block(wallImage, x, y, tileSize, tileSize);
        walls.add(wall);
      } else if (tileMapChar == "b") {
        const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
        ghosts.add(ghost);
      } else if (tileMapChar == "p") {
        const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
        ghosts.add(ghost);
      } else if (tileMapChar == "o") {
        const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
        ghosts.add(ghost);
      } else if (tileMapChar == "r") {
        const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
        ghosts.add(ghost);
      } else if (tileMapChar == "P") {
        pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
      } else if (tileMapChar == " ") {
        const food = new Block(null, x + 14, y + 14, 4, 4);
        foods.add(food);
      }
    }
  }
}

function update() {
  draw();
  setTimeout(update, 50);
}

function draw() {
  context.drawImage(
    pacman.image,
    pacman.x,
    pacman.y,
    pacman.width,
    pacman.height
  );
}

class Block {
  constructor(image, x, y, width, height) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.startX = x;
    this.startY = y;
  }
}
