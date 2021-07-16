let aiSide = true;
let scores = {
    P: 1,
    B: 3,
    H: 3,
    K: 10000000,
    Q: 9,
    R: 5,
    p: -1,
    b: -3,
    h: -3,
    k: -10000000,
    q: -9,
    r: -5

};

function pickPeice() {

    let peice;

    while (peice == null) {

        let x = floor(random(8));
        let y = floor(random(8));

        if (getSide(board[x][y]) == aiSide) {

            peice = board[x][y];
            selectedX = x;
            selectedY = y;
            selectedPeice = peice;
            // find go tiles
            goRook();
            goBishop();
            goPawn();
            goKing();
            goHorse();
            print(goTiles.length);
            if (goTiles.length == 0) {
                peice = null;
                goTiles = [];
            }

        }

    }

}

function pickTarget() {

    let rand = floor(random(goTiles.length));

    let tile = goTiles[rand];

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

function move() {
    pickPeice()
    pickTarget()
}

function findMoves(forAI, wMoves) {
    let peices = [];
    let side = aiSide;
    let baseScore = 0;

    if (forAI == false) {
        side = !side;
    } else {
        forAI = true;
    }

    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {

            let pSide = getSide(board[x][y]);

            if (pSide == side) {
                peices.push({ x: x, y: y, p: board[x][y] });
            }

            if (pSide != null) {
                baseScore = baseScore + scores[board[x][y]];
            }

        }
    }


    let moves = [];

    if (forAI) {

        for (peice of peices) {

            selectedX = peice.x;
            selectedY = peice.y;
            selectedPeice = peice.p;
            goTiles = [];

            goPawn();
            goRook();
            goKing();
            goBishop();
            goHorse();

            for (tile of goTiles) {

                let score = baseScore;
                let takeP = board[tile.x][tile.y];
                if (takeP != "") {
                    score = score - scores[takeP];
                }
                moves.push({

                    p: peice,
                    t: tile,
                    s: 0,
                    bs: score,
                    a: 0,
                    b: [],
                    g: goTiles


                });
                sTiles.push(tile);

            }
        }
    } else {

        for (wGo of wMoves) {

            let taken = board[wGo.t.x][wGo.t.y];
            board[wGo.p.x][wGo.p.y] = "";
            board[wGo.t.x][wGo.t.y] = wGo.p.p;

            for (peice of peices) {

                selectedX = peice.x;
                selectedY = peice.y;
                selectedPeice = peice.p;
                goTiles = [];

                goPawn();
                goRook();
                goKing();
                goBishop();
                goHorse();

                for (tile of goTiles) {

                    let score = wGo.bs;
                    let takeP = board[tile.x][tile.y];
                    if (takeP != "") {
                        score = score - scores[takeP];
                    }
                    wGo.a = wGo.a + 1;
                    wGo.s = wGo.s + score;
                    wGo.b.push({
                        t: tile,
                        p: peice,
                        s: score,
                        g: goTiles

                    })

                }
            }

            board[wGo.p.x][wGo.p.y] = wGo.p.p;
            board[wGo.t.x][wGo.t.y] = taken;

        }

    }

    goTiles = [];

    if (forAI) {
        return findMoves(false, moves);
    } else {

        let m = bestMove(wMoves);

        print(m);

        return m;

    }

}

function bestMove(moves) {
    print(moves);
    let bestMoves = [];
    let bestMove = { s: -Infinity };
    for (go of moves) {
        go.s = go.s / go.a
        if (bestMove.s < go.s) {
            bestMove = go
            bestMoves = [go]
        } else if (bestMove.s == go.s) {
            bestMoves.push(go);
        }

    }

    let rand = floor(random(bestMoves.length));
    bestMove = bestMoves[rand];

    selectedX = bestMove.p.x;
    selectedY = bestMove.p.y;
    selectedPeice = bestMove.p.p;
    goTiles = [bestMove.t];
    print(bestMoves);
    return bestMove;
}

function makeMove() {

    let move = findMoves();
    let tile = move.t;

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
