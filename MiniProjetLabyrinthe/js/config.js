let affichageSeconds = document.createElement('span');
let affichageEspace = document.createElement('span');
affichageEspace.innerHTML = ":";
let affichageTens = document.createElement('span');
let affichageEspaceS = document.createElement('span');
affichageEspaceS.innerHTML = "  ";
let affichageScore = document.createElement('span');
affichageScore.innerHTML = 0 ;
let clock = document.createElement('p');
    clock.classList.add('clock');
    clock.classList.add('disabled');
    clock.appendChild(affichageSeconds);
    clock.appendChild(affichageEspace);
    clock.appendChild(affichageTens);
    clock.appendChild(affichageEspaceS);
    clock.appendChild(affichageScore);


let seconds ;
let tens ;
let difficulty
affichageSeconds.innerHTML = seconds;
affichageTens.innerHTML = `0${tens}`;

let intervalTimeLevel; 


// ------------------------------
//           FUNCTIONS
// ------------------------------

function config() {

    if (tens <= 9) {
        affichageTens.innerHTML = `0${tens}`;
    }
    
    if (tens > 9) {
        affichageTens.innerHTML = tens;
    }
    
    if (tens === 0) {
        
        affichageSeconds.innerHTML = --seconds;
        
        tens = 99;
        affichageTens.innerHTML = tens;
    }
    
    if (seconds <= 9) {
        affichageSeconds.innerHTML = `0${seconds}`;
    }

    tens--;

    // OUT OF TIME : GAME OVER CASE
    if (seconds === 0) {

        tens = 0;
        affichageTens.innerHTML = `0${tens}`;

        // for the time stops
        clearInterval(intervalTimeLevel);

        // clearInterval(intervalTimeGame);

        gamePopUp("GAME OVER",
            `you failed the level`,
            `do you try again ?`,
            `exit game`,
            `try again`,
            0,
            difficulty);
        
        document.querySelector('.player').remove();
    }
}

function startTimerLevel() {

    // Reset timming before start new level
    seconds = 15;
    tens = 0;
    score = 0 ;
    affichageSeconds.innerHTML = seconds;
    affichageTens.innerHTML = `0${tens}`;
    affichageScore.innerHTML = score;

    // Start timming (when level start)
    intervalTimeLevel = setInterval(config, 10);
}
