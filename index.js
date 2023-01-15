let Ting=new Audio("./Ting Ding.mp3");
let Ding=new Audio("./Ting Ting Bass.mp3");

// Random Name Generator
const randomNameGenerator = () => {
    let res = '';
    for (let i = 0; i < 8; i++) {
        const random = Math.floor(Math.random() * 27);
        res += String.fromCharCode(97 + random);
    };

    return res;
};

// Player1 Selector
let one = document.getElementById("one");

//  Player2 Selector
let two = document.getElementById("two");

// Random Name for Computer
// two.value = randomNameGenerator();

// Start Box Selector
let start = document.getElementsByClassName("start")[0];

// Start Game Button Selector
let startGame = document.getElementById("startGame");

let playerOne = "", playerTwo = "";

// Tic Tac Toe Box Selector
let container = document.getElementsByClassName("container")[0];

// Start Game Button Click Event
startGame.addEventListener('click', (val) => {
    if (one.value !== "" && two.value !== "") {
        playerOne = one.value;
        playerTwo = two.value;

        start.style.display = "none";

        container.style.display = "flex";

        // Game Function Call
        Game();
        // console.log(playerOne,playerTwo);
    } else {
        alert("Please Enter Name !!");
    }
})

const Game = () => {
    // console.log(playerOne, playerTwo);

    // Cross Player Details
    let cross = document.getElementsByClassName("cross")[0];
    cross.innerHTML = `<h2>Player 1</h2><h2>X</h2><h2>${playerOne}</h2>`;

    // Circle Player Details
    let circle = document.getElementsByClassName("circle")[0];
    circle.innerHTML = `<h2>Player 2</h2><h2>O</h2><h2>${playerTwo}</h2>`;
}

// Restart Button
let reset = document.getElementsByClassName("reset")[0];

reset.addEventListener('click', (val) => {
    location.reload();
})

// Tic Tac Toe game

// Box Selector
let box = document.getElementsByClassName("box");

// Turn for every player
let turn = `<p style="color:rgb(237,23,78);">X</p>`;

let X = document.getElementsByClassName("X")[0];
let O = document.getElementsByClassName("O")[0];

X.style.background = "rgb(237,23,78)";

// Change Turn Function
const changeTurn = () => {
    if (turn === `<p style="color:rgb(237,23,78);">X</p>`) {
        X.style.background = "transparent";
        O.style.background = "rgb(255, 187, 0)";

        return `<p style="color:rgb(255, 187, 0);">O</p>`;
    }

    X.style.background = "rgb(237,23,78)";
    O.style.background = "transparent";

    return `<p style="color:rgb(237,23,78);">X</p>`;
}

// Finish Game
const finish = () => {
    setTimeout(() => {
        let a = document.getElementsByClassName("gameOver")[0];

        let tic = document.getElementsByClassName("tic")[0];

        tic.style.display = "none";
        a.style.display = "flex";

        if (turn === `<p style="color:rgb(237,23,78);">X</p>`) {
            Ding.play();
            a.innerHTML = `<h1>${playerOne} Win</h1>
           <img src="wiin.gif" alt="">`
        }
        else {
            Ding.play();
            a.innerHTML = `<h1>${playerTwo} Win</h1>
           <img src="wiin.gif" alt="">`
        }
    }, 1000);
}

let isGameOver = false;

// Win Position
const checkWin = () => {
    winPosition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    winPosition.forEach((i) => {
        if (box[i[0]].innerHTML !== "" && box[i[0]].innerHTML === box[i[1]].innerHTML && box[i[1]].innerHTML === box[i[2]].innerHTML) {

            isGameOver = true;

            // Match the Box
            box[i[0]].style.background = "rgb(52,73,94)";
            box[i[1]].style.background = "rgb(52,73,94)";
            box[i[2]].style.background = "rgb(52,73,94)";

            finish();
        }
    });
}

Array.from(box).forEach((elem) => {
    elem.addEventListener('click', (val) => {
        if (elem.innerHTML === "") {
            Ting.play();
            elem.innerHTML = turn;
            checkWin();
            if (!isGameOver) {
                turn = changeTurn();
            }
        }
    })
})
