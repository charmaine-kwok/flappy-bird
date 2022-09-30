const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// load images

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// some variables

const gap = 345;
const constant = pipeNorth.height + gap;
let score = 0;

let birdX = 10;
let birdY = 150;

const gravity = 1.5;

// audio files

let fly = new Audio();
let scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";


// on key down

document.addEventListener("keydown", () =>{
    birdY -= 25;
    fly.play();
});

// pipe coordinates

let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

function draw(){
    ctx.drawImage(bg, 0, 0);
    for(let i = 0; i < pipe.length; i ++){
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;
        if(pipe[i].x == 115){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // detect collision

        if (birdX + bird.width >= pipe[i].x && 
            birdX <= pipe[i].x + pipeNorth.width && 
            (birdY <= pipe[i].y + pipeNorth.height || birdY + bird.height >= pipe[i].y + constant) || 
            birdY + bird.height >= cvs.height - fg.height){
            location.reload(); // reload the page
        }

        if (pipe[i].x == 5){
            score++;
            scor.play();
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, birdX, birdY);
    ctx.fillStyle = "black";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    birdY += gravity;

    requestAnimationFrame(draw);
}


window.onload = function() {
    draw();
};
