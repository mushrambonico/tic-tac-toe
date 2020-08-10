const gameBoard = (function() {
    //const gameboard = new Array(9).fill(null);
    let gameboard = [];
    let hasWinner;
    /* Lógica do jogador computador... em construção
    const computerTurn = function() {
        let i = Math.floor(Math.random() * 9);
        if (gameBoard.gameboard[i] == null) {
            gameBoard.gameboard[i] = 'C';
            console.log('computer played');
            document.getElementById(`${i}-cell`).innerText = 'C';
        } else {
            console.log('invalid movement');
        }
    }
    const vsComputer = function() {
        const player = displayController.choosePlayer();
        if (!cell.innerText && hasWinner == false) {
            cell.innerText = currentPlayer.playerMarker;
            gameBoard.gameboard[index] = cell.innerText;
            computerTurn()
        }
     } */
    const changeSquare = function(cell, index) {
        const playerTurn = function() {
            if (!cell.innerText && hasWinner == false) {
                displayController.checkBtnValue();
                let currentPlayer = displayController.choosePlayer();
                cell.innerText = currentPlayer.playerMarker;
                gameBoard.gameboard[index] = cell.innerText;
                displayController.changeDisplay();
                hasWinner = checkWinner(currentPlayer);
                if (hasWinner) {
                    displayController.renderRestartBtn();
                }        
            }
        }
        const checkRows = function() {
            if (i == 0 || i == 3 || i == 6) {
                if (gameBoard.gameboard[i] != null && gameBoard.gameboard[i] == gameBoard.gameboard[i+1] && gameBoard.gameboard[i] == gameBoard.gameboard[i + 2]) {
                    return true;
                }
                return false;
            }
            return false;
        }
        const checkDiags = function() {
            if (i == 0 || i == 2) {
                if (i == 0 && gameBoard.gameboard[i] != null && gameBoard.gameboard[i] == gameBoard.gameboard[i+4] && gameBoard.gameboard[i] == gameBoard.gameboard[i+8])
                {
                    return true;
                } else if (i==2 && gameBoard.gameboard[i]!=null && gameBoard.gameboard[i]==gameBoard.gameboard[i+2] && gameBoard.gameboard[i]==gameBoard.gameboard[i+4])
                {
                    return true;
                }
                return false;
            }
            return false;
        }
        const checkCols = function() {
            if (i == 0 || i == 1 || i == 2) {
                if (gameBoard.gameboard[i] != null && gameBoard.gameboard[i] == gameBoard.gameboard[i+3] && gameBoard.gameboard[i] == gameBoard.gameboard[i+6]) {
                    return true;
                }
                return false;
            }
            return false;
        }
        const checkTie = function(array) {
            if (!array.includes(null)) {
                console.log(`It's a tie!`);
                displayController.displayTie()
                return true;
            }
        }
        const checkWinner = function(currentPlayer) {
            if (checkTie(gameBoard.gameboard)) {
                return true;
            }
            for (i = 0; i < gameBoard.gameboard.length; i++) {
                if (checkRows()) {
                    console.log(`${currentPlayer.playerId} just won`);
                    displayController.displayWinner();
                    return true;
                }
                if (checkDiags()) {
                    console.log(`${currentPlayer.playerId} just won`);
                    displayController.displayWinner();
                    return true;
                }
                if (checkCols()) {
                    console.log(`${currentPlayer.playerId} just won`);
                    displayController.displayWinner();
                    return true;
                }
            }
            return false;
        }
        cell.addEventListener('click', playerTurn);
    }
    const cleanGameBoard = function(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    const renderGameBoard = function() {
        gameBoard.gameboard = Array(9).fill(null); // Fill array with 9 null values (0-8 index)
        hasWinner = false; // Game just started
        let board = document.getElementById('gameboard');
        let firstLine = document.getElementById('first-line');
        let secondLine = document.getElementById('second-line');
        let thirdLine = document.getElementById('third-line');
        let lineArray = [firstLine, secondLine, thirdLine];
        cleanGameBoard(firstLine);
        cleanGameBoard(secondLine);
        cleanGameBoard(thirdLine);
        for (let i = 0; i < gameBoard.gameboard.length; i++) {
            let cell = document.createElement('div');
            cell.id = `${i}-cell`;
            changeSquare(cell, i);
            cell.innerText = gameBoard.gameboard[i];
            lineArray[0].append(cell);
            if ((i + 1) % 3 == 0) {
                lineArray.shift();
            }
            if (i == 0 ||  i == 3 || i == 6) {
                cell.classList.toggle('no-left-border');
            }
            if (i == 0 || i == 1 || i == 2) {
                cell.classList.toggle('no-top-border');
            }
            if (i == 2 || i == 5 || i == 8) {
                cell.classList.toggle('no-right-border');
            }
            if (i == 6 || i == 7 || i == 8) {
                cell.classList.toggle('no-bottom-border');
            }
        }
    };
    return {
        renderGameBoard,
        gameboard,
        hasWinner
    };
})();
const player = function(marker, id) {
    const playerMarker = marker;
    const playerId = id;
    let score = 0;
    return {
        playerMarker,
        playerId,
        score
    };
};
const displayController = (function() {
    let players = [];
    let btnCounter = 0;
    const startGame = function() {
        if (document.getElementById('restart-btn')) {
            document.getElementById('restart-btn').remove();
        }
        document.getElementById('display-header').innerText = `Go ahead ${players[btnCounter].playerId}, the game has started.`;
        gameBoard.renderGameBoard();
        displayScore();
    }
    const createPlayer = function(element) {
        const newPlayer = player(element.target.innerText, btnCounter == 0 ? 'Player 1' : 'Player 2');
        players.push(newPlayer);
        element.target.classList.toggle('clicked-btn');
        element.target.removeEventListener('click', createPlayer);
        if (btnCounter == 0) {
            document.getElementById('display-header').innerText = "Player 2, please choose your marker:"
            btnCounter += 1;
        } else { // If players have been created already:
            btnCounter = 0;
            startGame();
        }
    }
    const checkBtnValue = function() {
        if (btnCounter == 2) {
            btnCounter = 0;
        }
    }
    const incrementBtnValue = function() {
        btnCounter += 1;
    }
    const changeDisplay = function() {
        incrementBtnValue();
        checkBtnValue();
        document.getElementById('display-header').innerText = `${players[btnCounter].playerId}, it's your turn. 
        (${players[btnCounter].playerMarker})`;
    }
    const displayWinner = function() {
        incrementBtnValue();
        checkBtnValue();
        document.getElementById('display-header').innerText = `${players[btnCounter].playerId} just won`;
        players[btnCounter].score += 1;
    }
    const displayTie = function() {
        incrementBtnValue();
        checkBtnValue();
        document.getElementById('display-header').innerText = `It's a tie!`;
    }
    const displayScore = function() {
        if (document.getElementById('score')) {
            document.getElementById('score').innerText = `Player 1 Score: ${players[0].score} \n Player 2 Score: ${players[1].score}`;
            return true;
        }
        const score = document.createElement('div');
        score.id = "score";
        document.getElementById('gameboard').append(score);
    }
    const choosePlayer = function() {
        return players[btnCounter];
    }
    const renderRestartBtn = function() {
        const displayInterface = document.getElementById('display-controller');
        const btn = document.createElement('button');
        btn.id = 'restart-btn';
        btn.innerText = 'Restart Game'
        btn.addEventListener('click', startGame);
        displayInterface.append(btn);
    }
    document.getElementById('x').addEventListener('click', createPlayer);
    document.getElementById('o').addEventListener('click', createPlayer);
    return {
        checkBtnValue,
        choosePlayer,
        changeDisplay,
        displayWinner,
        displayTie,
        renderRestartBtn
    };
})();

