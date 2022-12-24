// Selection <main>
const leMain = document.querySelector('main');

// Creation <aside>
const aside = document.createElement('aside');

let score = 0;

// Creation Play button Level Easy
const playBtnEasy = document.createElement('button');
playBtnEasy.innerHTML = "Niveau Facile"
// Creation Play button Level Medius
const playBtnMoyen = document.createElement('button');
playBtnMoyen.innerHTML = "Niveau Moyen"
// Creation Play button Level Easy
const playBtnHard = document.createElement('button');
playBtnHard.innerHTML = "Niveau Difficile"

// Deplacement playBtn + clock dans <aside>
aside.appendChild(playBtnEasy);
aside.appendChild(playBtnMoyen);
aside.appendChild(playBtnHard);
aside.appendChild(clock);

// Deplacement <aside> dans <body>
document.body.insertBefore(aside, document.body.children[0]);


// levels list
const LEVELS_LIST = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5];

// Set current level number for get him in the [LEVELS_LIST] array
let levelNumber = 0;


// ------------------------------------------
//                 FUNCTIONS
// ------------------------------------------

// FUNCTION LEVEL GENERATOR : - Genere un level(tileset) precis dans le <main>
//                            - Genere le player dans starting tile
//                            - Event KeyDown : Switch touches mouvement player + Win Condition


function levelGenerator(set, difficulty) {

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
    let Ennem = document.getElementsByClassName('E');
    let EnnemId = [];
    for (let g = 0; g < Ennem.length; g++) {
        EnnemId.push(Ennem[g].getAttribute('id'));
    }

    switch (difficulty) {
        case "Easy":
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
            while (document.getElementsByClassName('E').length) {
                document.getElementsByClassName('E')[0].classList.remove("E");
            }
            break;
        case "Moyen":
            while (document.getElementsByClassName('E').length) {
                document.getElementsByClassName('E')[0].classList.remove("E");
            }
            break;
        case "Hard":
            console.log("now ay");
            break;
    }

    player1.classList.add('player');

    startPos.appendChild(player1);


    // ------ KEYDOWN EVENT -------
    document.addEventListener('keydown', (e) => {

        // Get ID of the current square -> transform this string into a number -> add the number of column in the maze-grid for target the next row in the grid
        let squareIdNumber = Number(player1.parentElement.getAttribute('id'));
        let squareUpId = squareIdNumber - LEVELS_LIST[levelNumber][0].length;
        let squareDownId = squareIdNumber + LEVELS_LIST[levelNumber][0].length;
        // console.log(squareIdNumber, LEVELS_LIST[levelNumber][0].length,squareUpId , squareDownId)
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

        // ------- Gold Event(Condition) --------
        if (GoldsId.includes(player1.parentElement.getAttribute('id'))) {
            player1.parentElement.classList.remove("G");
            GoldsId.splice(GoldsId.indexOf(player1.parentElement.getAttribute('id')),1);
            score += 5;
        }

        // ------- Time Event(Condition) --------
        if (TimesId.includes(player1.parentElement.getAttribute('id'))) {
            player1.parentElement.classList.remove("H");
            TimesId.splice(TimesId.indexOf(player1.parentElement.getAttribute('id')),1);
            seconds += 5;
        }

        // ------- Lose Event(Condition) --------
        if (LosesId.includes(player1.parentElement.getAttribute('id'))) {
            player1.parentElement.classList.remove("L");
            LosesId.splice(LosesId.indexOf(player1.parentElement.getAttribute('id')),1);
            score -= 3;
        }

        // ------- Chance Event(Condition) --------
        if (PatriId.includes(player1.parentElement.getAttribute('id'))) {
            player1.parentElement.classList.remove("P");
            PatriId.splice(PatriId.indexOf(player1.parentElement.getAttribute('id')),1);
            ii = Math.floor(Math.random() * 3);
            switch (ii) {
                case 0 :
                    score += 3;
                    break;
                case 1 :
                    score -= 3;
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
                gamePopUp("VICTORY ! (Fin de la demo du jeu)",
                    `well done you passed level ${levelNumber + 1} in ${14 - seconds}:${99 - tens} seconds`,
                    `you completed the whole game in ${totalSeconds}:${totalTens} seconds`,
                    `exit game`,
                    `play again`,
                    0,
                    resetGameTimer());

            } else {
                gamePopUp(`well done you passed level ${levelNumber + 1} in ${14 - seconds}:${99 - tens} seconds`,
                    "",
                    `ready for level ${levelNumber + 2} ?`,
                    `not today`,
                    `YES !`,
                    levelNumber + 1);
            }

        }
    })
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
function gamePopUp(a, b, c, d, e, f, g) {

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
        leMain.classList.toggle('disabled'); // Cache: body
    })

    const popUpBtnYes = document.createElement('button');
    popUpBtnYes.innerHTML = e;
    popUpBtnYes.addEventListener('click', () => {

        exitLevel();

        // Modify [levelNumber] before start new game or new level (f == 0 || f == levelNumber++)
        levelNumber = f;
        levelGenerator(LEVELS_LIST[levelNumber]);

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

    playBtnEasy.classList.toggle('disabled'); // Cache: playBtn
    playBtnMoyen.classList.toggle('disabled'); // Cache: playBtn
    playBtnHard.classList.toggle('disabled'); // Cache: playBtn
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

    playBtnEasy.classList.toggle('disabled'); // Cache: playBtn
    playBtnMoyen.classList.toggle('disabled'); // Cache: playBtn
    playBtnHard.classList.toggle('disabled'); // Cache: playBtn
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

    playBtnEasy.classList.toggle('disabled'); // Cache: playBtn
    playBtnMoyen.classList.toggle('disabled'); // Cache: playBtn
    playBtnHard.classList.toggle('disabled'); // Cache: playBtn
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
