// Tic Tac Toe
// Eric James
// May Wed. 19 2021
//

// capital = white
// lowercase = black
// p = pawn
// b = bishop
// r = rook
// h = knight
// k = king
// q = queen

let win;
let goTiles = [];
let goSTiles = [];
let sTiles = [];
let selectedPeice;
let turn = true;
let selectedX;
let selectedY;
let tileW;
let tileH;
let board = []
for (let x = 0; x < 8; x++) {
  if (board[x] == null) {
    board[x] = [];
  }
  for (let y = 0; y < 8; y++) {
    board[x][y] = "";
  }
}

let assets = {

  P: "assets/wp.png",
  K: "assets/wk.png",
  B: "assets/wb.png",
  R: "assets/wr.png",
  H: "assets/wh.png",
  Q: "assets/wq.png",
  p: "assets/bp.png",
  k: "assets/bk.png",
  b: "assets/bb.png",
  h: "assets/bh.png",
  q: "assets/bq.png",
  r: "assets/br.png"

}

let scales = {

  P: 0,
  K: 0,
  B: 0,
  R: 0,
  H: 0,
  Q: 0,
  p: 0,
  k: 0,
  b: 0,
  h: 0,
  q: 0,
  r: 0

}

function preload() {

  let peices = ["P", "B", "R", "H", "K", "Q", "p", "b", "r", "k", "h", "q"];

  for (key of peices) {

    assets[key] = loadImage(assets[key]);

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (width > height) {
    tileW = height / 8;
    tileH = height / 8;
  } else if (width < height) {
    tileW = width / 8;
    tileH = width / 8;
  }

  for (let x = 0; x < 8; x++) {
    board[x][1] = "P";
    board[x][6] = "p";
  }

  let peices = ["P", "B", "R", "H", "K", "Q", "p", "b", "r", "k", "h", "q"];

  for (key of peices) {

    assets[key].resize(assets[key].width / assets[key].height * tileW, tileH)

  }

  board[0][0] = "R";
  board[1][0] = "H";
  board[2][0] = "B";
  board[3][0] = "K";

  board[4][0] = "Q";
  board[5][0] = "B";
  board[6][0] = "H";
  board[7][0] = "R";

  board[0][7] = "r";
  board[1][7] = "h";
  board[2][7] = "b";
  board[3][7] = "k";

  board[4][7] = "q";
  board[5][7] = "b";
  board[6][7] = "h";
  board[7][7] = "r";

}

function draw() {
  if (turn) {
    background(255);
  } else {
    background(0);
  }

  if (win != null) {
    noLoop();
  }

  for (let x = 0; x < 8; x++) {

    for (let y = 0; y < 8; y++) {

      fill(120, 80, 0);
      if (x % 2 == y % 2) {

        fill(255, 224, 161);

      }

      rect(x * tileW, y * tileH, tileW, tileH);

    }

  }

  if (selectedX != null && selectedY != null) {

    fill(53, 176, 55, 200);
    rect(selectedX * tileW, selectedY * tileH, tileW, tileH);

  }

  for (spot of goTiles) {
    fill(3, 177, 252, 150);
    rect(spot.x * tileW, spot.y * tileH, tileW, tileH)
  }

  for (let x = 0; x < 8; x++) {

    for (let y = 0; y < 8; y++) {

      if (board[x][y] != "") {

        image(assets[board[x][y]], x * tileW + (tileW - assets[board[x][y]].width) / 2, y * tileH);

      }
    }

  }

  if (turn == aiSide) {
    makeMove();
  }

  if (win == true) {
    background(255);
  } else if (win == false) {
    background(0);
  }

}

function windowResized() {
  resizeCanvas(windowWidth - 300, windowHeight);
}

function mousePressed() {

  x = floor(mouseX / tileW);
  y = floor(mouseY / tileH);

  // move peice

  for (tile of goTiles) {
    if (tile.x == x && tile.y == y) {

      if (board[tile.x][tile.y] == "k") {
        win = true;
      } else if (board[tile.x][tile.y] == "K") {
        win = false;
      }

      board[selectedX][selectedY] = "";
      board[tile.x][tile.y] = selectedPeice;
      turn = !turn;
      selectedX = null;
      selectedY = null;
      selectedPeice = "";
      goTiles = [];

    }

  }

  // select tile
  if (getSide(board[x][y]) == turn) {
    selectedX = x;
    selectedY = y;
    selectedPeice = board[x][y];
    goTiles = [];
  } else {
    return
  }

  // find go tiles
  goRook();
  goBishop();
  goPawn();
  goKing();
  goHorse();

}

function getSide(peice) {

  if (peice == "") {
    return null;
  }

  return (peice.toUpperCase() == peice);

}

function addGoTile(x, y) {
  if (x > 7 || x < 0 || y > 7 || y < 0) {
    return
  }
  if (selectedY != y || selectedX != x) {
    if (board[x][y] == "") {
      goTiles.push({ x: x, y: y });
      return 1;
    } else if (getSide(board[x][y]) != getSide(selectedPeice)) {
      goTiles.push({ x: x, y: y });
      return 2;
    }
    for (sTile in sTiles) {

      if (sTile.x == x && sTile.y == y) {
        goSTiles.push({ x: x, y: y });
      }

    }
    return 3;
  }
  return 0;
}
