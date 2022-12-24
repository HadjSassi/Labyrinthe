// Selection <main>
const leMain = document.querySelector('main');

// Creation <aside>
const aside = document.createElement('aside');

let score = 0;
affichageScore.innerHTML = score;
// Creation Play button Level Easy
const playBtnEasy = document.createElement('button');
playBtnEasy.innerHTML = "Niveau Facile"
// Creation Play button Level medium
const playBtnMoyen = document.createElement('button');
playBtnMoyen.innerHTML = "Niveau Moyen"
// Creation Play button Level Easy
const playBtnHard = document.createElement('button');
playBtnHard.innerHTML = "Niveau Difficile"
// Creation Play button Level Easy
const helpButton = document.createElement('button');
helpButton.innerHTML = "Game Description"

// Deplacement playBtn + clock dans <aside>
aside.appendChild(playBtnEasy);
aside.appendChild(playBtnMoyen);
aside.appendChild(playBtnHard);
aside.appendChild(helpButton);
aside.appendChild(clock);

// Deplacement <aside> dans <body>
document.body.insertBefore(aside, document.body.children[0]);


// levels list
const LEVELS_LIST = [LEVEL_3];

// Set current level number for get him in the [LEVELS_LIST] array
let levelNumber = 0;


// ------------------------------------------
//                 FUNCTIONS
// ------------------------------------------

// FUNCTION LEVEL GENERATOR : - Genere un level(tileset) precis dans le <main>
//                            - Genere le player dans starting tile
//                            - Event KeyDown : Switch touches mouvement player + Win Condition


function levelGenerator(set, difficulty) {
    randomizeBonusMalus();

    // ------ MODIFICATION VARIABLES CSS (GRID) --------
    leMain.style.setProperty('--nbrRows', `repeat(${LEVELS_LIST[levelNumber].length}, 60px)`);
    leMain.style.setProperty('--nbrColumns', `repeat(${LEVELS_LIST[levelNumber][0].length}, 60px)`);

    // ------- TILESET CREATION -------
    let indexID = 1;
    for (let arr of LEVELS_LIST[levelNumber]) {
        for (let elem of arr) {

            let newSquare = document.createElement('section');

            newSquare.classList.add(elem);
            newSquare.setAttribute('id', indexID++);

            if (elem === "*") {
                newSquare.classList.add("wall");
            } else {
                newSquare.classList.add("path");
            }

            leMain.appendChild(newSquare);
        }
    }
    // ------- Ennemy CREATION -------
    let EnnemPos = document.querySelector('.E');
    let enemy1 = document.createElement('section');
    // ------- PLAYER CREATION -------
    let startPos = document.querySelector('.S');
    let player1 = document.createElement('section');


    let Golds = document.getElementsByClassName('G');
    let GoldsId = [];
    for (let g = 0; g < Golds.length; g++) {
        GoldsId.push(Golds[g].getAttribute('id'));
    }
    let Times = document.getElementsByClassName('H');
    let TimesId = [];
    for (let g = 0; g < Times.length; g++) {
        TimesId.push(Times[g].getAttribute('id'));
    }
    let Loses = document.getElementsByClassName('L');
    let LosesId = [];
    for (let g = 0; g < Loses.length; g++) {
        LosesId.push(Loses[g].getAttribute('id'));
    }
    let Patri = document.getElementsByClassName('P');
    let PatriId = [];
    for (let g = 0; g < Patri.length; g++) {
        PatriId.push(Patri[g].getAttribute('id'));
    }
    switch (difficulty) {
        case "Easy":
            PatriId = [];
            LosesId = [];
            TimesId = [];
            GoldsId = [];
            while (document.getElementsByClassName('G').length) {
                document.getElementsByClassName('G')[0].classList.remove("G");
            }
            while (document.getElementsByClassName('H').length) {
                document.getElementsByClassName('H')[0].classList.remove("H");
            }
            while (document.getElementsByClassName('L').length) {
                document.getElementsByClassName('L')[0].classList.remove("L");
            }
            while (document.getElementsByClassName('P').length) {
                document.getElementsByClassName('P')[0].classList.remove("P");
            }
            break;
        case "Moyen":
            break;
    }

    player1.classList.add('player');
    enemy1.classList.add('ennemy');
    startPos.appendChild(player1);
    if (difficulty === 'Hard')
        EnnemPos.appendChild(enemy1);

    // ------ KEYDOWN EVENT -------
    document.addEventListener('keydown', (e) => {

        // Get ID of the current square -> transform this string into a number -> add the number of column in the maze-grid for target the next row in the grid
        let squareIdNumber = Number(player1.parentElement.getAttribute('id'));
        let squareUpId = squareIdNumber - LEVELS_LIST[levelNumber][0].length;
        let squareDownId = squareIdNumber + LEVELS_LIST[levelNumber][0].length;
        switch (e.key) {
            case 'ArrowUp':
                if (document.getElementById(`${squareUpId}`).classList.contains('path')) {

                    document.getElementById(`${squareUpId}`).appendChild(player1);
                }
                break;

            case 'ArrowDown':
                if (document.getElementById(`${squareDownId}`).classList.contains("path")) {

                    document.getElementById(`${squareDownId}`).appendChild(player1);
                }
                break;

            case 'ArrowLeft':
                if (player1.parentElement.previousSibling.classList.contains("path")) {

                    player1.parentElement.previousSibling.appendChild(player1);
                }
                break;

            case 'ArrowRight':
                if (player1.parentElement.nextSibling.classList.contains("path")) {

                    player1.parentElement.nextSibling.appendChild(player1);
                }
                break;

            default:
                console.log(`Erreur: Touche ${e.key} non definie.`);
        }
        if (difficulty === 'Hard')
            MoveEnnemie(enemy1, player1);

        // ------- Gold Event(Condition) --------
        if (GoldsId.includes(player1.parentElement.getAttribute('id'))) {
            player1.parentElement.classList.remove("G");
            GoldsId.splice(GoldsId.indexOf(player1.parentElement.getAttribute('id')), 1);
            score += 5;
            affichageScore.innerHTML = score;
        }

        // ------- Time Event(Condition) --------
        if (TimesId.includes(player1.parentElement.getAttribute('id'))) {
            player1.parentElement.classList.remove("H");
            TimesId.splice(TimesId.indexOf(player1.parentElement.getAttribute('id')), 1);
            seconds += 5;
        }

        // ------- Lose Event(Condition) --------
        if (LosesId.includes(player1.parentElement.getAttribute('id'))) {
            player1.parentElement.classList.remove("L");
            LosesId.splice(LosesId.indexOf(player1.parentElement.getAttribute('id')), 1);
            score -= 3;
            affichageScore.innerHTML = score;
        }

        // ------- Defeat Event(Condition) --------
        if (difficulty === 'Hard' && player1.parentElement.getAttribute('id') === enemy1.parentElement.getAttribute('id')) {
            tens = 0;
            affichageTens.innerHTML = `0${tens}`;

            clearInterval(intervalTimeLevel);

            // clearInterval(intervalTimeGame);

            gamePopUp("GAME OVER",
                `you failed the level`,
                `do you try again ?`,
                `exit game`,
                `try again`,
                0,
                difficulty,
                resetGameTimer());
            document.querySelector('.player').remove();
        }

        // ------- Chance Event(Condition) --------
        if (PatriId.includes(player1.parentElement.getAttribute('id'))) {
            player1.parentElement.classList.remove("P");
            PatriId.splice(PatriId.indexOf(player1.parentElement.getAttribute('id')), 1);
            ii = Math.floor(Math.random() * 3);
            switch (ii) {
                case 0 :
                    score += 3;
                    affichageScore.innerHTML = score;
                    break;
                case 1 :
                    score -= 3;
                    affichageScore.innerHTML = score;
                    break;
                case 2 :
                    startPos.appendChild(player1);
                    break;
            }
        }


        // ------- Win Event(Condition) --------
        if (player1.parentElement.getAttribute('id') === document.querySelector('.T').getAttribute('id')) {

            clearInterval(intervalTimeLevel);

            clearInterval(intervalTimeGame);

            removePopUp();

            if (levelNumber === (LEVELS_LIST.length - 1)) {
                gamePopUp("VICTORY !",
                    `well done you passed the level with ${score} score`,
                    `you completed the whole game in Time`,
                    `exit game`,
                    `play again`,
                    0,
                    difficulty,
                    resetGameTimer());
                document.querySelector('.player').remove();

            } else {
                gamePopUp(`well done you passed level ${levelNumber + 1} in Time`,
                    "",
                    `ready for level ${levelNumber + 2} ?`,
                    `not today`,
                    `YES !`,
                    levelNumber + 1,
                    difficulty,);
                document.querySelector('.player').remove();
            }

        }
    })
}

function clearMaze() {
    for (let i = 0; i < LEVELS_LIST[levelNumber].length; i++) {
        for (let j = 0; j < LEVELS_LIST[levelNumber][i].length; j++) {
            if (LEVELS_LIST[levelNumber][i][j] !== '*' && LEVELS_LIST[levelNumber][i][j] !== 'S' && LEVELS_LIST[levelNumber][i][j] !== 'E'&& LEVELS_LIST[levelNumber][i][j] !== 'T' ) {
                LEVELS_LIST[levelNumber][i][j] = '.';
            }
        }
    }
}

function randomizeBonusMalus() {
    clearMaze();
    paths = [];
    let ii, xy;
    let k = 1;
    let symbols = ['G', 'H', 'L', 'P', 'G', 'H', 'L', 'P']
    for (let i = 0; i < LEVELS_LIST[levelNumber].length; i++) {
        for (let j = 0; j < LEVELS_LIST[levelNumber][i].length; j++) {
            if (LEVELS_LIST[levelNumber][i][j] === '.') {
                paths.push(k);
            }
            k++;
        }
    }
    // LEVELS_LIST[levelNumber][3][5] = 'G';
    for (let i = 0; i < 8; i++) {
        ii = Math.floor(Math.random() * paths.length);
        xy = getPosition(paths[ii]);
        LEVELS_LIST[levelNumber][xy[0] - 1][xy[1] - 1] = symbols[i];
        paths.splice(ii, 1);
    }


}

function moveTowardsPlayer(monsterPos, playerPos) {
    const [monsterRow, monsterCol] = monsterPos;
    const [playerRow, playerCol] = playerPos;

    const rowDiff = playerRow - monsterRow;
    const colDiff = playerCol - monsterCol;

    let newRow = monsterRow;
    let newCol = monsterCol;

    if (Math.abs(rowDiff) > Math.abs(colDiff)) {
        // move towards player in the row direction
        newRow += rowDiff > 0 ? 1 : -1;
    } else {
        // move towards player in the column direction
        newCol += colDiff > 0 ? 1 : -1;
    }
    // check if the new position is a wall or not
    if (LEVELS_LIST[levelNumber][newRow - 1][newCol - 1] === '*') {
        // if it's a wall, we can't move there
        return monsterPos;
    } else {
        // if it's not a wall, update the monster's position
        return [newRow, newCol];
    }
}

function getPosition(iddd) {
    let k = 1;
    idd = Number(iddd);
    for (let i = 1; i <= LEVELS_LIST[levelNumber].length; i++) {
        for (let j = 1; j <= LEVELS_LIST[levelNumber][0].length; j++) {
            if (k === idd) {
                return [i, j];
            } else {
                k++;
            }
        }
    }
}

function getIndex(xy) {
    return ((xy[0] - 1) * LEVELS_LIST[levelNumber][0].length + xy[1]);
}

function MoveEnnemie(enemy1, player1) {
    let xy = moveTowardsPlayer(
        getPosition(enemy1.parentElement.getAttribute('id')),
        getPosition(player1.parentElement.getAttribute('id'))
    );
    let k = getIndex(xy);
    document.getElementById(k).appendChild(enemy1);
}

//  ----- FUNCTION REMOVE POPUP : remove all <div> -----
function removePopUp() {
    for (let elem of document.querySelectorAll('div')) {
        elem.remove();
    }
}


// ----- FUNCTION EXIT LEVEL : remove popUp + player + tiles + <main> -----
function exitLevel() {
    for (let section of document.querySelectorAll('section')) {
        section.remove();
    }

    removePopUp();
}


// ------------------------------------
//        function GAME POPUP
// ------------------------------------
function gamePopUp(a, b, c, d, e, f, g, h) {

    // Creation text du popup 
    const popupDivText = document.createElement('div');

    const popUpText1 = document.createElement('p');
    popUpText1.innerHTML = a;

    const popUpText2 = document.createElement('p');
    popUpText2.innerHTML = b;

    const popUpText3 = document.createElement('p');
    popUpText3.innerHTML = c;

    popupDivText.appendChild(popUpText1);
    popupDivText.appendChild(popUpText2);
    popupDivText.appendChild(popUpText3);

    // Creation btns no/yes du popup
    const popUpDivBtns = document.createElement('div');
    popUpDivBtns.classList.add('winBtns');

    const popUpBtnNo = document.createElement('button');
    popUpBtnNo.innerHTML = d;
    popUpBtnNo.addEventListener('click', () => {

        exitLevel();

        clock.classList.toggle('disabled'); // Cache: body
        playBtnEasy.classList.toggle('disabled'); // Affiche: body
        playBtnMoyen.classList.toggle('disabled'); // Affiche: body
        playBtnHard.classList.toggle('disabled'); // Affiche: body
        helpButton.classList.toggle('disabled'); // Affiche: body
        leMain.classList.toggle('disabled'); // Cache: body
    })

    const popUpBtnYes = document.createElement('button');
    popUpBtnYes.innerHTML = e;
    popUpBtnYes.addEventListener('click', () => {

        exitLevel();

        // Modify [levelNumber] before start new game or new level (f == 0 || f == levelNumber++)
        levelNumber = f;
        levelGenerator(LEVELS_LIST[levelNumber], g);

        g; // (g == rien || g == resetGameTimer())
        startGameTimer();

        startTimerLevel();
    })

    popUpDivBtns.appendChild(popUpBtnNo);
    popUpDivBtns.appendChild(popUpBtnYes);

    // popUpDivText + popUpDivBtns => popUp => <aside>
    const popUp = document.createElement('div');
    popUp.classList.add('winPopUp');
    popUp.appendChild(popupDivText);
    popUp.appendChild(popUpDivBtns);
    aside.appendChild(popUp);
}


// ----------------------------------------------------------------
//                    CLICK EVENT LISTENER
// ----------------------------------------------------------------

// ------- PLAYBTNEasy clickEvent -------
playBtnEasy.addEventListener('click', () => {
    score = 0;
    affichageScore.innerHTML = score;
    playBtnEasy.classList.toggle('disabled'); // Cache: playBtn
    playBtnMoyen.classList.toggle('disabled'); // Cache: playBtn
    playBtnHard.classList.toggle('disabled'); // Cache: playBtn
    helpButton.classList.toggle('disabled'); // Cache: playBtn
    clock.classList.toggle('disabled'); // Affiche: clock
    leMain.classList.toggle('disabled'); // Affiche: body


    // Reset [levelNumber] before start new game
    levelNumber = 0;
    levelGenerator(LEVELS_LIST[levelNumber], "Easy");

    // RESET and START gameTimming and levelTimming before start new game
    resetGameTimer();
    startGameTimer();

    startTimerLevel(); // (Le reset est comprit dans la function)
});


// ------- PLAYBTNMoyen clickEvent -------
playBtnMoyen.addEventListener('click', () => {
    score = 0;
    affichageScore.innerHTML = score;
    playBtnEasy.classList.toggle('disabled'); // Cache: playBtn
    playBtnMoyen.classList.toggle('disabled'); // Cache: playBtn
    playBtnHard.classList.toggle('disabled'); // Cache: playBtn
    helpButton.classList.toggle('disabled'); // Cache: playBtn
    clock.classList.toggle('disabled'); // Affiche: clock
    leMain.classList.toggle('disabled'); // Affiche: body


    // Reset [levelNumber] before start new game
    levelNumber = 0;
    levelGenerator(LEVELS_LIST[levelNumber], "Moyen");

    // RESET and START gameTimming and levelTimming before start new game
    resetGameTimer();
    startGameTimer();

    startTimerLevel(); // (Le reset est comprit dans la function)
});


// ------- PLAYBTNHard clickEvent -------
playBtnHard.addEventListener('click', () => {
    score = 0;
    affichageScore.innerHTML = score;
    playBtnEasy.classList.toggle('disabled'); // Cache: playBtn
    playBtnMoyen.classList.toggle('disabled'); // Cache: playBtn
    playBtnHard.classList.toggle('disabled'); // Cache: playBtn
    helpButton.classList.toggle('disabled'); // Cache: playBtn
    clock.classList.toggle('disabled'); // Affiche: clock
    leMain.classList.toggle('disabled'); // Affiche: body


    // Reset [levelNumber] before start new game
    levelNumber = 0;
    levelGenerator(LEVELS_LIST[levelNumber], "Hard");

    // RESET and START gameTimming and levelTimming before start new game
    resetGameTimer();
    startGameTimer();

    startTimerLevel(); // (Le reset est comprit dans la function)
});

// ------- Game Description -------------
helpButton.addEventListener('click',() => {
    playBtnEasy.classList.toggle('disabled'); // Cache: playBtn
    playBtnMoyen.classList.toggle('disabled'); // Cache: playBtn
    playBtnHard.classList.toggle('disabled'); // Cache: playBtn
    helpButton.classList.toggle('disabled'); // Cache: playBtn

    location.href = './help.html';

});
