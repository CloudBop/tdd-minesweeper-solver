class GameBoard {
  // TODO - try with single array using sqrt
  // must be a 2d grid [[]] or will fail
  constructor(gameBoardState) {
    // TODO - neater initialisation
    this.numberOfRows= gameBoardState.length
    this.numberOfCols= gameBoardState[0].length
    // assign cells to empty 2d array or cells[0][0] === undefined (!empty array)
    this.cells = [[],[]]
    // populate empty state
    for (let row = 0; row < this.numberOfRows; row++) {
      for (let col = 0; col < this.numberOfCols; col++) {
        // set initial state - not null
        if(gameBoardState[row][col]>=0){
          this.cells[row][col] = gameBoardState[row][col] 
        }else{
          this.cells[row][col] = this.unknownCell
        }
      }
    }
  }
}


window.GameBoard = GameBoard