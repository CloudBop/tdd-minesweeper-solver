//
// grid spec - TODO, set dynamically
const cellSize=30;
const numOfColumns=8;
const numOfRows=8;

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
  let currentGameBoard = new GameBoard([[0,0,0,0],[0,0,0,0]])
  
}