let h2 = document.querySelector('h2');
let level = 0;
let started = false;
let boxes = ['red', 'green', 'purple', 'yellow']
let gameSeq = [];
let userSeq = [];
let highestscore = 0;


document.addEventListener('keypress', function(){
    if(started == false){
        console.log('game is started');
        started = true;

        levelup();
    } 
})

function levelup(){
    userSeq = [];
    level++;
    if(level>highestscore){
        highestscore = level; 
    }
    h2.innerText = `Level: ${level}`;
    let randindx = Math.floor(Math.random()*4)
    let randcolor = boxes[randindx];
    let flashbox = document.querySelector(`.${randcolor}`)
    gameSeq.push(randcolor);
    gameflash(flashbox);
}

function gameflash(flashbox){
    flashbox.classList.add('gameflash');
    setTimeout(()=>{
        flashbox.classList.remove('gameflash'); 
    }, 500);
}

function boxpress(){
    let flashbox = this;
    userflash(flashbox);

    let usercolor = flashbox.getAttribute('id');
    userSeq.push(usercolor);
    checkans(userSeq.length-1);
}

function userflash(flashbox){
    flashbox.classList.add('userflash');
    setTimeout(()=>{
        flashbox.classList.remove('userflash');
    }, 500)
}

let allboxes = document.querySelectorAll('.box');
for(box of allboxes){
    box.addEventListener('click', boxpress);
}

function checkans(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            setTimeout(levelup, 500);
        }
    } else{
        h2.innerHTML = `Game Over! your score was <b>${level}</b> <br>,Highest Score was <b>${highestscore}</b>, Press any key to start.`;
        reset();
    }
}

function reset(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    console.log('Highest Score :', highestscore);
}