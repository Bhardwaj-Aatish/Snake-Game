// game constant and variable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('eatsound.mp3');
const gameOverSound = new Audio('gameover2.mp3.mp3')
const moveSound = new Audio('move.mp3')
const musicSound = new Audio('gamemusic2.mp3')
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 5, y: 8 };





// Game function 
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if (((ctime - lastPaintTime) / 1000) < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    // if snake cut yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            // gameOverSound.play();
            return true;
        }
    }
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0) {
        gameOverSound.play();
        return true;
        // alert('hello');
    }
    if (snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        gameOverSound.play();
        // alert('aatish')
        return true;
    }
    // return false;
}

function gameEngine() {
    // part1 : updating the snake array 
    if (isCollide(snakeArr)) {

        // gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert('Game over! press any key to play again');
        speed = 7;
        scorebox.innerHTML = "Score " + 0;
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play();
        score = 0;

    }
    // if you have eaten the food increament the score and regenrate the food 

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        // speed++;
        score++;
        if (hiScoreval <= score) {
            hiScoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiScoreval));
            highscore.innerHTML = "Highscore " + hiScoreval;
        }
        if (score % 3 == 0) {
            speed++;
        }
        scorebox.innerHTML = "Score     " + score;
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }



    // moving the snake 


    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // part2: display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}






// main logic starts here 



// highscore logic
let hiScore = localStorage.getItem("hiScore");
if (hiScore === null) {
    hiScoreval = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreval));
}
else {
    hiScoreval = JSON.parse(hiScore);
    highscore.innerHTML = "Highscore : " + hiScore;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    // inputDir = { x: 0, y: 1 } //Start the game
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y !== 1 || snakeArr.length < 3) {
                console.log('abhi');
                inputDir.x = 0;
                inputDir.y = -1;
            }
            console.log("ArrowUp");
            moveSound.play();

            break;

        case "ArrowDown":
            console.log("ArrowDown");
            moveSound.play();
            if (inputDir.y != -1 || snakeArr.length < 3) {
                inputDir.x = 0;
                inputDir.y = 1;

            }
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            moveSound.play();
            if (inputDir.x != 1 || snakeArr.length < 3) {
                inputDir.x = -1;
                inputDir.y = 0;
            }

            break;

        case "ArrowRight":
            console.log("ArrowRight");
            moveSound.play();
            if (inputDir.x != -1 || snakeArr.length < 3) {
                inputDir.x = 1;
                inputDir.y = 0;
            }
            break;

        default:
            break;
    }
})


// var audio_volume = 0.6;
// const playMusic = (path) => {
//     // Audio is built in
//     const audio = new Audio(path)

//     audio.volume = audio_volume
//     audio.play();

// }

// const slider = document.getElementById("volume__slider")
// slider.oninput = (event) => {
//     // /100 because to divide the slider into 100 parts, so we get value between 0 and 1
//     audio_volume = event.target.value / 100;
// }