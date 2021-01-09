//
// grid spec - TODO, set dynamically
const cellSize=30;
const numOfColumns=8;
const numOfRows=8;
// careful, string-literal
const strPuzzle1 = `
0   1 11
   3    
13 5 4  
 2   31 
  332  0
     1  
 1 0 1  
        `;


// draws grid
const drawGridLines=(ctx)=>{
  for (let column = 1; column < numOfColumns; column++) {
    // ctx.strokeRect(column*cellSize, 0, numOfColumns*cellSize, numOfRows*cellSize)
    // drawLine(column * cellSize, 0, column * cellSize, numOfRows * cellSize)

    ctx.beginPath();       // Start a new path
    ctx.moveTo(column * cellSize,0);    // Move the pen to (30, 50)
    ctx.lineTo(column * cellSize, numOfRows * cellSize);  // Draw a line to (150, 100)
    ctx.stroke();          // Render the path
  }
  
  for (let row = 1; row < numOfRows; row++) {
  
    ctx.beginPath();       // Start a new path
    ctx.moveTo(0, row * cellSize);    // Move the pen to (30, 50)
    ctx.lineTo(numOfColumns * cellSize, row*cellSize);  // Draw a line to (150, 100)
    ctx.stroke();          // Render the path
  }
}


const initialise = (ctx)=> {
  
  drawGridLines(ctx);

  const grid = helpers.gridFromStringLiteral(strPuzzle1)
  // weird undefined bug:issue without initialising constructor as 2d array of 0s... setting init state with grid causes error
  let currentGameBoard = new GameBoard([[0,0,0,0],[0,0,0,0]])
  currentGameBoard.stateStateFromArray(grid)

  console.log('currentGameBoard', currentGameBoard)
  
}