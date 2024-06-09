let wordsList = ["majority", "weight", "handle", "indicate", "persuade", "require", "stone", "table", "marriage", "freeze", "character", "drink", "emphasize", "miracle", "whom",
    "so-called", "examination", "couple", "remain", "deer", "portrait", "floor", "suspect", "gaze", "goal", "program", "cow", "symptom", "permit", "plastic", "money", "odd", "cat",
    "car", "athletic", "specifically", "season", "radio", "choice", "associate", "window", "mind", "description", "currently", "beat", "surprising", "classroom", "task"];

let originalWordsList = [...wordsList];

let crossesMade = [0];
let mistakesMade = [0];
let globalScore = [0];
let watchedWordList = [];
let clickedWords = [];

function wordGenerateFunction() {
    let hideGrid = document.querySelector(".main-word-generated");
    if (hideGrid) {
        hideGrid.classList.toggle("hide");
    }
}

function hideFunction() {
    let buttonHide = document.querySelectorAll(".main-start-game-button");
    buttonHide.forEach(button => {
        button.classList.toggle("hide");
    });
}

function hideGridFunction() {
    let hideGrid = document.getElementById("main-grid-css-id");
    hideGrid.classList.toggle("hide");
}

function showFunction() {
    let buttonWordGenerateAppear = document.getElementById("main-word-id");
    buttonWordGenerateAppear.classList.toggle("appear");
}

function newGameAppear() {
    let buttonNewGameAppear = document.getElementById("main-new-game-id");
    buttonNewGameAppear.classList.toggle("appear");
}

function updateScore() {
    const scoreElement = document.querySelector('.main-score p');
    scoreElement.innerHTML = `Amount of rounds that you won: ${globalScore[0]}`;
}

function failedFunction() {
    let failedHTML = `
    <div class="main-failed-block">
        <div class="main-failed-image">
            <img src="failed.png" alt="failed image"></img>
        </div>
    </div>
    `;
    document.querySelector('.main-failed').innerHTML = failedHTML;

    watchedWordList = [];
    mistakesMade[0] = 0;
    crossesMade[0] = 0;

    hideGridFunction();
    newGameAppear();
    wordGenerateFunction();
    showFunction();
    hideHearts();
}

function hideHearts() {
    document.getElementById("heart1").classList.add("hide");
    document.getElementById("heart2").classList.add("hide");
    document.getElementById("heart3").classList.add("hide");
}

function updateHearts() {
    document.getElementById("heart1").classList.toggle("hide", mistakesMade[0] >= 1);
    document.getElementById("heart2").classList.toggle("hide", mistakesMade[0] >= 2);
    document.getElementById("heart3").classList.toggle("hide", mistakesMade[0] >= 3);
}

function attachButtonListeners() {
    document.querySelectorAll('.main-grid-css button').forEach(button => {
        button.addEventListener('click', function () {
            if (!this.classList.contains('disabled')) {
                this.classList.toggle('active');
                let word = this.innerText;
                if (watchedWordList.includes(word)) {
                    this.classList.add("green");
                    this.classList.remove("red");
                    crossesMade[0] += 1;
                } else {
                    this.classList.add("red");
                    this.classList.remove("green");
                    mistakesMade[0] += 1;
                    updateHearts();

                    if (mistakesMade[0] >= 3) {
                        failedFunction();
                    }
                }

                this.classList.add('disabled');

                if (crossesMade[0] >= 5) {
                    globalScore[0] += 1;

                    let wellDoneHTML = `
                        <div class="main-well-done">
                            <div class="main-well-done-image">
                                <img src="well-done.png" alt="well done image"></img>
                            </div>
                        </div>
                    `;
                    document.querySelector('.main-well-played').innerHTML = wellDoneHTML;
                    wordsList = [...originalWordsList];
                    watchedWordList = [];
                    mistakesMade[0] = 0;
                    crossesMade[0] = 0;
                    newGameAppear();
                    hideGridFunction();
                    showFunction();
                    wordGenerateFunction();
                    hideHearts();
                }
                updateScore();
            }
        });
    });
}

function generateButton() {
    let gameList = [];
    let gridHTML = '';

    for (let i = 0; i < 25; i++) {
        const min = 0, max = wordsList.length - 1;
        let number = Math.floor(Math.random() * (max - min + 1)) + min;

        gameList.push(wordsList[number]);
        wordsList.splice(number, 1);
    }

    function gridButtons() {
        for (let i = 0; i < 25; i++) {
            gridHTML += `<button class="main-grid-button">${gameList[i]}</button>`

        }
        return gridHTML;
    }

    gridHTML += `
            <div id="main-grid-css-id" class="main-grid-css">
                ${gridButtons()}
            </div>
        `;

    document.querySelector('.main-grid').innerHTML = gridHTML;

    let heartHTML = `
            <img id="heart1" src="heart.png" alt="heart">
            <img id="heart2" src="heart.png" alt="heart">
            <img id="heart3" src="heart.png" alt="heart">
        `;
    document.querySelector('.main-tries-left').innerHTML = heartHTML;

    wordsList = [...originalWordsList];
}

function generateList() {
    generateButton();
    attachButtonListeners();
    showFunction();
    hideFunction();
    updateScore();
}

function initializeGame() {
    let firstGameEventListener = document.querySelector(".main-start-game-button");
    firstGameEventListener.addEventListener("click", () => {
        generateList();
    });

    let newGameButton = document.querySelector(".main-new-game-button");
    newGameButton.addEventListener('click', () => {
        document.querySelector('.main-word-generated').innerHTML = '';

        crossesMade[0] = 0;

        let buttonHideYeee = document.querySelectorAll(".main-well-done");
        buttonHideYeee.forEach(element => element.classList.add("hide"));

        let buttonHideFailed = document.querySelectorAll(".main-failed-block");
        buttonHideFailed.forEach(element => element.classList.add("hide"));

        newGameAppear();
        generateButton();
        attachButtonListeners();
        showFunction();
        wordGenerateFunction();
    });

    document.querySelectorAll(".main-word-button").forEach(button => {
        button.addEventListener('click', () => {
            if (wordsList.length > 0) {
                const min = 0, max = wordsList.length - 1;
                let number = Math.floor(Math.random() * (max - min + 1)) + min;
                let generateArray = [wordsList[number]];
                watchedWordList.push(wordsList[number]);
                wordsList.splice(number, 1);

                let generatedHTML = `
                <div>
                    <p>${generateArray}</p>
                </div>
                `;
                document.querySelector('.main-word-generated').innerHTML = generatedHTML;
            } else if (wordsList.length === 0) {
                wordsList = [...originalWordsList];
                failedFunction();
            }
        });
    });
}

initializeGame();