const gameBoard = (() => {
    let arr = ["", "", "", "", "", "", "", "", ""];
    let scoreArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let counter = 0;
    let isOver = false;
    let player1 = "X";
    let player2 = "O"
    let cuSymbol = player1;
    let winStates = "";
    const getArr = () => arr;
    const getCounter = () => counter;
    const getscoreArr = () => scoreArr;
    const getIsOver = () => isOver;
    const getCuSymbol = () => cuSymbol;
    const getWinStates = () => winStates;
    const setP1Name = (p1) => {
        player1 = p1;
    };
    const setP2Name = (p2) => {
        player2 = p2;
    };
    const mark = (index) => {
        arr[index] = cuSymbol;
        counter++;
        if (cuSymbol == "X") {
            scoreArr[index] = 1;
            cuSymbol = "O";
        } else {
            scoreArr[index] = -1;
            cuSymbol = "X";
        }
        if (counter >= 5) {
            verify();
        }
        if (counter == 9) {
            isOver = true;
            cuSymbol = "X"
        }
    };
    const verify = () => {
        // by row
        let sum1 = scoreArr[0] + scoreArr[1] + scoreArr[2];
        let sum2 = scoreArr[3] + scoreArr[4] + scoreArr[5];
        let sum3 = scoreArr[6] + scoreArr[7] + scoreArr[8];
        // by column
        let sum4 = scoreArr[0] + scoreArr[3] + scoreArr[6];
        let sum5 = scoreArr[1] + scoreArr[4] + scoreArr[7];
        let sum6 = scoreArr[2] + scoreArr[5] + scoreArr[8];
        // by cross
        let sum7 = scoreArr[0] + scoreArr[4] + scoreArr[8];
        let sum8 = scoreArr[6] + scoreArr[4] + scoreArr[2];

        if (sum1 == 3 || sum2 == 3 || sum3 == 3 || sum4 == 3 || sum5 == 3 || sum6 == 3 || sum7 == 3 || sum8 == 3) {
            winStates = player1 + " Won!";
            isOver = true;
        } else if (sum1 == -3 || sum2 == -3 || sum3 == -3 || sum4 == -3 || sum5 == -3 || sum6 == -3 || sum7 == -3 || sum8 == -3) {
            winStates = player2 + " Won!";
            isOver = true;
        } else if (counter == 9) {
            winStates = "It's Tie";
            isOver = true;
        }
        if (isOver) {
            displayController.displayResult();
        }

    }
    const restart = () => {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = "";
            scoreArr[i] = 0;
        }
        counter = 0;
        isOver = false;
        cuSymbol = "X"
        winStates = "";
        displayController.refresh();
        displayController.displayResult();
    }
    return {
        getArr,
        getCounter,
        getIsOver,
        getCuSymbol,
        getscoreArr,
        getWinStates,
        setP1Name,
        setP2Name,
        mark,
        restart
    };
})();

const displayController = (() => {
    let arr = gameBoard.getArr();
    const refresh = () => {
        for (let i = 0; i < arr.length; i++) {
            let conDiv = document.getElementById(i);
            conDiv.innerHTML = arr[i];
        }
    }
    const displayResult = () => {
        let resDiv = document.getElementById("result");
        resDiv.innerHTML = gameBoard.getWinStates();
    }
    return {
        refresh,
        displayResult

    }
})();

// factory function
const Player = (name, symbol) => {
    let pname = name;
    let psymbol = symbol;
    const getName = () => pname;
    const getSymbol = () => psymbol;

    retirm(getName, getSymbol);
}

function registerListener() {
    document.querySelectorAll('.grid-item').forEach(function (e) {
        e.addEventListener('click', clickEvt, false);
    });
}

function clickEvt() {
    let idx = this.id;
    let localArr = gameBoard.getArr();
    if (localArr[idx] == "" && !gameBoard.getIsOver()) {
        gameBoard.mark(idx);
    } else if (gameBoard.getIsOver()) {
        let stat = gameBoard.getWinStates();
    }
    displayController.refresh();
}

function start() {
    displayController.refresh();
    registerListener();
}

function reGame() {
    gameBoard.restart();
    displayController.refresh();
}

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

function inputName() {
    let n1 = document.getElementById("p1").value;
    let n2 = document.getElementById("p2").value;
    gameBoard.setP1Name(n1);
    gameBoard.setP2Name(n2);
    closeForm();
}