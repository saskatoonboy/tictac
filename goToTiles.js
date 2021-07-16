function goRook() {
    if (selectedPeice.toLowerCase() == "r" || selectedPeice.toLowerCase() == "q") {
        for (let x = selectedX + 1; x < 8; x++) {
            let result = addGoTile(x, selectedY);
            if (result == 2 || result == 3) {

                break;

            }

        }

        for (let x = selectedX - 1; x >= 0; x--) {
            let result = addGoTile(x, selectedY);
            if (result == 2 || result == 3) {

                break;

            }

        }

        for (let y = selectedY + 1; y < 8; y++) {

            let result = addGoTile(selectedX, y);
            if (result == 2 || result == 3) {

                break;

            }

        }

        for (let y = selectedY - 1; y >= 0; y--) {

            let result = addGoTile(selectedX, y);
            if (result == 2 || result == 3) {

                break;

            }

        }

    }
}

function goBishop() {
    if (selectedPeice.toLowerCase() == "b" || selectedPeice.toLowerCase() == "q") {
        for (let i = 0; i < 8; i++) {
            let result = addGoTile(selectedX + i, selectedY + i);
            if (result == 2 || result == 3) {

                break;

            }

        }

        for (let i = 0; i < 8; i++) {
            let result = addGoTile(selectedX - i, selectedY + i);
            if (result == 2 || result == 3) {

                break;

            }

        }

        for (let i = 0; i < 8; i++) {
            let result = addGoTile(selectedX - i, selectedY - i);
            if (result == 2 || result == 3) {

                break;

            }

        }

        for (let i = 0; i < 8; i++) {
            let result = addGoTile(selectedX + i, selectedY - i);
            if (result == 2 || result == 3) {

                break;

            }

        }

    }
}

function goPawn() {
    if (selectedPeice.toLowerCase() == "p") {
        if (getSide(selectedPeice)) {

            if (board[selectedX][selectedY+1] == "") {
                addGoTile(selectedX, selectedY + 1);
                if (selectedY == 1 && board[selectedX][selectedY+2] == "") {
                    addGoTile(selectedX, 3);
                }
            }
            if (selectedX > 0) {
                if (board[selectedX - 1][selectedY + 1] != "") {
                    addGoTile(selectedX - 1, selectedY + 1);
                }
            }
            if (selectedX < 7) {
                if (board[selectedX + 1][selectedY + 1] != "") {
                    addGoTile(selectedX + 1, selectedY + 1);
                }
            }

        } else {

            if (board[selectedX][selectedY-1] == "") {
                addGoTile(selectedX, selectedY - 1);
                if (selectedY == 6 && board[selectedX][selectedY-2] == "") {
                    addGoTile(selectedX, 4);
                }
            }
            if (selectedX > 0) {
                if (board[selectedX - 1][selectedY - 1] != "") {
                    addGoTile(selectedX - 1, selectedY - 1);
                }
            }
            if (selectedX < 7) {
                if (board[selectedX + 1][selectedY - 1] != "") {
                    addGoTile(selectedX + 1, selectedY - 1);
                }
            }

        }

    }
}

function goKing() {
    if (selectedPeice.toLowerCase() == "k") {

        for (let x=-1; x<2; x++) {
            for (let y=-1; y<2; y++) {
                
                addGoTile(selectedX+x, selectedY+y);

            }
        }

    }
}

function goHorse() {
    if (selectedPeice.toLowerCase() == "h") {

        addGoTile(selectedX+2, selectedY+1);
        addGoTile(selectedX+2, selectedY-1);

        addGoTile(selectedX-2, selectedY+1);
        addGoTile(selectedX-2, selectedY-1);

        addGoTile(selectedX+1, selectedY+2);
        addGoTile(selectedX+1, selectedY-2);

        addGoTile(selectedX-1, selectedY+2);
        addGoTile(selectedX-1, selectedY-2);

    }
}
