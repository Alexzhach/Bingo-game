let winningPositions = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24]
];

let copyWinningPositions = [...winningPositions];

let watchedWordListTwo = [];
let globalScoreTwo = [0];

/* TOGGLE FUNCTIONS */
function hideGetNumberButton() {
    let buttonWordGenerateAppear = document.getElementById("main-number-id");
    buttonWordGenerateAppear.classList.add("hide");
}

function showGetNumberButton() {
    let buttonWordGenerateAppear = document.getElementById("main-number-id");
    buttonWordGenerateAppear.classList.remove("hide");
}

function showNewGameButton() {
    let buttonNewGameAppear = document.getElementById("main-new-game-id-two");
    buttonNewGameAppear.classList.add("appear");
}

function hideNewGameButton() {
    let buttonNewGameAppear = document.getElementById("main-new-game-id-two");
    buttonNewGameAppear.classList.remove("appear");
}

function hideStartSecondGameFunction() {
    let buttonHide = document.querySelectorAll(".main-start-second-game-button");
    buttonHide.forEach(button => {
        button.classList.add("hide");
    });
}

function wellDoneHideFunction() {
    let buttonHideWellDone = document.querySelectorAll(".main-well-done-two");
    buttonHideWellDone.forEach(button => {
        button.classList.add("hide");
    });
}

function bingoHideFunction() {
    let bingoHide = document.querySelectorAll(".letters-bingo");
    bingoHide.forEach(el => {
        el.classList.remove("show-bingo");
    });
}

function failedAddTwoFunction(){
    let failedHide = document.querySelector(".main-failed-two");
    failedHide.classList.add("hide");
}

function failedHideTwoFunction(){
    let failedHide = document.querySelector(".main-failed-two");
    failedHide.classList.remove("hide");
}

/* OTHER FUNCTIONS */
function newGameTwoAppear() {
    document.getElementById("main-new-game-id-two").addEventListener("click", () => {
        watchedWordListTwo = [];

        wellDoneHideFunction();
        showGetNumberButton();
        hideTableTwo();
        yee();
        hideNewGameButton();
        failedAddTwoFunction();
    });
}

function updateScoreTwo() {
    const scoreElement = document.querySelector('.main-score-two p');
    scoreElement.innerHTML = `Amount of rounds that you won: ${globalScoreTwo[0]}`;
}

function hideTableTwo() {
    const table = document.querySelector("#tblBingo");
    table.innerHTML = '';
}

function failedTwoFunction(){
    let failedHTML = `
    <div class="main-failed-block">
        <div class="main-failed-image">
            <img src="failed.png" alt="failed image"></img>
        </div>
    </div>
    `;
    document.querySelector('.main-failed-two').innerHTML = failedHTML;

    document.querySelector('.main-number-generated').innerHTML = '';

    hideGetNumberButton();
    showNewGameButton();
    hideTableTwo();
    bingoHideFunction();
    failedHideTwoFunction();
}

function yee() {
    const table = document.querySelector("#tblBingo");
    const letter = document.querySelectorAll(".letters-bingo");

    let arr = Array.from({ length: 25 }, (_, i) => i);

    function shuffle(arr) {
        let currentIndex = arr.length, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }

        return arr;
    }

    arr = shuffle(arr);
    let arr1 = shuffle([...arr]);

    document.querySelectorAll(".main-number-button").forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });

    document.querySelectorAll(".main-number-button").forEach(button => {
        button.addEventListener("click", () => {
            if (arr1.length > 0) {
                const min = 0, max = arr1.length - 1;
                let numberIndex = Math.floor(Math.random() * (max - min + 1)) + min;
                let generateArrayTwo = arr1[numberIndex];
                
                watchedWordListTwo.push(generateArrayTwo);
                arr1.splice(numberIndex, 1);

                let generatedTwoHTML = `
                    <div>
                        <p>${generateArrayTwo}</p>
                    </div>
                    `;
                document.querySelector('.main-number-generated').innerHTML = generatedTwoHTML;
                console.log(watchedWordListTwo);
                console.log(generateArrayTwo);
            } else {
                failedTwoFunction();
                arr1 = shuffle([...arr]);
                watchedWordListTwo = [];
            }
        });
    });

    let iterator = 0;

    for (let i = 0; i < 5; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);

        for (let j = 0; j < 5; j++) {
            let td = document.createElement("td");
            td.id = arr[iterator].toString();
            td.classList.add("main-table-cell");

            let div = document.createElement("div");
            div.classList.add("cell-format");
            div.textContent = arr[iterator].toString();
            td.appendChild(div);
            tr.appendChild(td);
            iterator++;
        }
    }

    const cell = document.querySelectorAll(".main-table-cell");
    let winningIterator = 0;
    cell.forEach(e => {
        e.addEventListener("click", () => {
            if (watchedWordListTwo.includes(parseInt(e.id))) {
                e.classList.add("strickout");
            } else {
                failedTwoFunction();
            }

            if (matchWin()) {
                letter[winningIterator]?.classList.add("show-bingo");

                winningIterator++;
                if (winningIterator === 5) {
                    globalScoreTwo[0]++;
                    winningIterator = 0;
                    let wellDoneHTML = `
                        <div class="main-well-done-two">
                            <div class="main-well-done-image">
                                <img src="well-done.png" alt="well done image"></img>
                            </div>
                        </div>
                    `;
                    document.querySelector('.main-well-played-two').innerHTML = wellDoneHTML;

                    document.querySelector('.main-number-generated').innerHTML = '';

                    updateScoreTwo();
                    hideGetNumberButton();
                    hideTableTwo();
                    bingoHideFunction();
                    showNewGameButton();

                    const cell = document.querySelectorAll(".main-table-cell");
                    cell.forEach(el => {
                        el.classList.remove("strickout");
                    });
                    winningPositions = [...copyWinningPositions];
                }
            }
        });
    });

    function matchWin() {
        const cell = document.querySelectorAll(".main-table-cell");

        return winningPositions.some(combination => {
            let ite = 0;
            combination.forEach(index => {
                if (cell[index]?.classList.contains("strickout")) ite++;
            });

            if (ite === 5) {
                let indexWin = winningPositions.indexOf(combination);
                winningPositions.splice(indexWin, 1);
            }
            return combination.every(index => {
                return cell[index]?.classList.contains("strickout");
            });
        });
    }
    newGameTwoAppear();
    updateScoreTwo();
}

function secondGameModeFunction() {
    var secondGameEventListener = document.querySelector(".main-second-game-mode-button");
    secondGameEventListener.addEventListener("click", () => {
        yee();
        hideStartSecondGameFunction();
        showGetNumberButton();
    });
}

secondGameModeFunction();