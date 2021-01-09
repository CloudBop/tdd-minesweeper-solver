//
// grid spec - TODO, set dynamically
const cellSize=30;
const numOfColumns=8;
const numOfRows=8;
// store ref of GameBoard
let gameBoard = null
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

// draws string
function drawSymbol(ctx, symbol, col, row){

  if(symbol==='!'){
    
    ctx.fillStyle = '#000';
      // canvasCtx.fillRect(ballX,200, 25, 25)
      ctx.beginPath();
      var beginAngleRadians = 0
      var endAngleRadians = Math.PI*2
      var clockwise = true
      var x = (col+1)*(cellSize);
      var y = (row+1)*(cellSize);

      ctx.arc(x-(cellSize/2), y-(cellSize/2), cellSize*0.3, beginAngleRadians, endAngleRadians, clockwise)
      ctx.fill()
    
  } else {
    var text = ctx.measureText(symbol); // TextMetrics object
    // console.log('text', text)
    ctx.font = '20px serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'bottom';
  
    var x = col*cellSize;
    var y = row*cellSize;
    // debugger
    ctx.fillText(symbol, x+((cellSize-text.width)/2), y+((cellSize)/2));
  }
}
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

function populateCurrentGrid(ctx){
  for (let row = 0; row < numOfRows; row++) {
    for (let col = 0; col < numOfColumns; col++) {
      ctx.fillStyle = "#000";
      drawSymbol(ctx, gameBoard.cellContents(col, row), col,row);
    }
  }
}

function drawResult(ctx, solution){
  // 
  populateCurrentGrid(ctx)
  // 
  // TODO - responsive grid, text inside canvas
  document.getElementById("solution-desc").innerHTML = solution.description
  //
  if (!solution.cellOfInterest) return 

  document.getElementById("currentCell").innerHTML =  "[" + solution.cellOfInterest.row + "]["+ solution.cellOfInterest.col+"]"

  solution.solvedCells.forEach(cell => {
    ctx.fillStyle = "#15974b";
    drawSymbol(ctx, gameBoard.cellContents(cell.col, cell.row), cell.col, cell.row);
  });
  
  // current cell
  ctx.fillStyle = "#ff0000";
  drawSymbol(ctx, gameBoard.cellContents(solution.cellOfInterest.col, solution.cellOfInterest.row), solution.cellOfInterest.col, solution.cellOfInterest.row);

  
}

const initialise = (ctx)=> {
  
  drawGridLines(ctx);
  const grid = helpers.gridFromStringLiteral(strPuzzle1)
  // weird undefined bug:issue without initialising constructor as 2d array of 0s... setting init state with grid causes error
  gameBoard = new GameBoard([[0,0,0,0],[0,0,0,0]])
  gameBoard.stateStateFromArray(grid)
  populateCurrentGrid(ctx);

  document.getElementById("solve").addEventListener('click', function(){
    // overwrite previous render
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // try and solve
    const result = gameBoard.solve()
    //
    drawGridLines(ctx);
    drawResult(ctx,result)
  })
}