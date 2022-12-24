const LEVEL_1 = [  ["*","*","*","*","*","*","*","*","*","*","*","*","*"],
  ["*","S",".",".",".",".",".","*","*","*","*","H","*"],
  ["*",".","*","*","*",".",".",".",".",".",".",".","*"],
  ["*",".",".",".","*",".","*","*","*",".","*",".","*"],
  ["*","*","*",".","*",".","*","*",".","*","*",".","*"],
  ["*","*",".",".","*",".","*","*",".","*","*",".","*"],
  ["*",".",".","*","*",".",".",".","K",".",".",".","*"],
  ["*",".","*","*","*",".","*","*","*","*","*",".","*"],
  ["*",".",".",".",".",".",".",".",".",".","*",".","*"],
  ["*",".","*","*","*","*","*",".","*",".",".",".","*"],
  ["*",".",".",".",".","*","*","*",".",".","*",".","*"],
  ["*","*","*","*","*","*","*","*","*","*","*","*","*"]
];

const MONSTER_CHAR = 'K';
const PLAYER_CHAR = 'S';

function findChar(maze, char) {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === char) {
        return [i, j];
      }
    }
  }
}

function moveTowardsPlayer(maze, monsterPos, playerPos) {
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
if (maze[newRow][newCol] === '*') {
// if it's a wall, we can't move there
return monsterPos;
} else {
// if it's not a wall, update the monster's position
return [newRow, newCol];
}
}

function chasePlayer(maze) {
let monsterPos = findChar(maze, MONSTER_CHAR);
let playerPos = findChar(maze, PLAYER_CHAR);

while (true) {
console.log(`Monster at ${monsterPos}, player at ${playerPos}`);
monsterPos = moveTowardsPlayer(maze, monsterPos, playerPos);
if (monsterPos[0] === playerPos[0] && monsterPos[1] === playerPos[1]) {
    console.log('Monster caught the player!');
    break;
  }
  
  // add code here to move the player if needed
  
  // check if the player has escaped
  if (/* player has escaped */) {
    console.log('Player has escaped!');
    break;
  }
}
}

chasePlayer(LEVEL_1);
