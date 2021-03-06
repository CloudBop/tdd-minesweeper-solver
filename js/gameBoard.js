// output data
class Solution {
  constructor(cell = null, solvedCells = [], description = 'nothing') {
    this.description = description;
    this.cellOfInterest = cell;
    this.solvedCells = solvedCells;
  }
}
// to store individual cell data
class CellLocation {
  constructor(row = -1, column = -1, mineCount = null) {
    this.col = column;
    this.row = row;
    this.value = mineCount;
    this.isUnused = row === -1 && column === -1;
  }
}

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
    this.unknownCell= -1;
    this.mine = -2
    this.empty = -3
  }

  stateStateFromArray(grid){
    this.numberOfRows = grid.length;
    this.numberOfCols = grid[0].length;
    // create grid 2 d grid
    this.cells = grid.map(row => {
      return row.map(cell => {
        // if empty string, place a -1
        return cell === ' ' ? this.unknownCell : parseInt(cell);
      });
    });
  }
  //
  cellContents(col,row) {
    const cell = this.cells[row][col];
    switch (cell) {
      case this.unknownCell:
        return '';
      case this.mine:
        return '!';
      case this.empty:
        return 'x';
      default:
        // must be int
        return cell;
    }
  }
  doesCellContainsMineCount(row, col) {
    if (this.cells[row][col] >= 0) {
      return this.cells[row][col];
    }
    return NaN;
  }
  //
  getNeighbours(row, col) {
    const neighbours = [];
    /**
     * 123
     * 4+5
     * 678
     */

    if (row > 0 && col > 0) neighbours.push(new CellLocation(row - 1, col - 1));
    if (row > 0) neighbours.push(new CellLocation(row - 1, col));
    if (row > 0 && this.numberOfCols - 1 > col) neighbours.push(new CellLocation(row - 1, col + 1));
    //
    if (col > 0) neighbours.push(new CellLocation(row, col - 1));
    if (this.numberOfRows > row) neighbours.push(new CellLocation(row, col + 1));
    //
    if (row < this.numberOfRows - 1 && col > 0) neighbours.push(new CellLocation(row + 1, col - 1));
    if (row < this.numberOfRows - 1) neighbours.push(new CellLocation(row + 1, col));
    if (row < this.numberOfRows - 1 && col < this.numberOfCols - 1) neighbours.push(new CellLocation(row + 1, col + 1));

    return neighbours;
  }
  // 
  neighboursWithMines = (row, col) => {
    const neighbours = this.getNeighbours(row, col);
    return neighbours.filter(cell => this.cells[cell.row][cell.col] === this.mine);
  };
  // 
  neighboursWhichAreUnknown = (row, col) => {
    const neighbours = this.getNeighbours(row, col);
    return neighbours.filter(cell => this.cells[cell.row][cell.col] === this.unknownCell);
  };
  solve(){
    // 
    let solution = this.methodOne();
    
    // cell must contain mine
    if(!solution) solution = this.methodTwo();

    if(!solution) solution = this.methodThree();
    if(!solution) solution = this.methodFour();
    
    if(!solution) return {
      description: "No results for any cells"
    }
    
    return solution
  }
  //
  methodOne() {
    for (let row = 0; row < this.numberOfRows; row++) {
      for (let col = 0; col < this.numberOfCols; col++) {
        
        // does cell contain a count ?
        const mineCount = this.doesCellContainsMineCount(row, col);
        if (mineCount >= 0) {
          // 
          const neighboursWithMines = this.neighboursWithMines(row, col);
          // 
          const neighboursWhichAreUnknown = this.neighboursWhichAreUnknown(row, col);
          //
          const minesLeftToPlace = mineCount - neighboursWithMines.length;
          //
          if (minesLeftToPlace === 0 && neighboursWhichAreUnknown.length > 0) {
            // these cells are now known!
            neighboursWhichAreUnknown.forEach(cell => {
              //
              const { row, col } = cell;
              // mutate current cells data to empty
              this.cells[row][col] = this.empty;
            });
            return new Solution(
              new CellLocation(row, col, mineCount),
              neighboursWhichAreUnknown,
              `zero mines to place`
            );
          }
        }
        //
      }
    }
    // nothing returned in this board iteration
    return null;
  }
  methodTwo() {
    for (let row = 0; row < this.numberOfRows; row++) {
      for (let col = 0; col < this.numberOfCols; col++) {
        
        const mineCount = this.doesCellContainsMineCount(row, col);
        // (false >= 0) === true - ?avascript
        if (mineCount >= 0) {
          const neighboursWithMines = this.neighboursWithMines(row, col);
          const neighboursWhichAreUnknown = this.neighboursWhichAreUnknown(row, col);
          //
          const minesLeftToPlace = mineCount - neighboursWithMines.length;

          if (minesLeftToPlace > 0 && minesLeftToPlace === neighboursWhichAreUnknown.length) {
            
            neighboursWhichAreUnknown.forEach(cell => {
              const { row, col } = cell;
              // set to mine
              this.cells[row][col] = this.mine;
            });

            return new Solution(
              new CellLocation(row, col, mineCount),
              neighboursWhichAreUnknown,
              'remaining neighbours of cell must be mine'
              // `remaining neighbours ${neighboursWhichAreUnknown.map( cell => `[${cell.row}, ${cell.col}]`)} around cell[${row}][${col}] must be mine`
            );
          }
        }
        //
      }
    }
    return null;
  }
  // fill unknown with mine and re-play until board is invalid.
  methodThree() {
    // initiate new validator for current play
    const Validator = new GameValidator();
    // iterate board
    for (let row = 0; row < this.numberOfRows; row++) {
      for (let col = 0; col < this.numberOfCols; col++) {
        //
        if (this.cells[row][col] === this.unknownCell) {
          // place mine
          this.cells[row][col] = this.mine;
          // track moves
          const movesToUndo = [];
          let solution;
          do {
            // try method one
            solution = this.methodOne();
            if (solution === null) {
              // ../ method two
              solution = this.methodTwo();
            }
            // if solution found
            if (solution !== null && typeof solution === 'object') {
              // track updated cells
              movesToUndo.push(...solution.solvedCells);
              // validate board
              const result = Validator.validateBoard(this);
              //
              if (!result.isValid) {
                // must be empty
                this.cells[row][col] = this.empty;
                // reset the moves
                movesToUndo.forEach(cell => (this.cells[cell.row][cell.col] = this.unknownCell));
                // 
                return new Solution(
                  result.cellOfInterest,
                  [ new CellLocation(row, col) ],
                  `cannot contain a mine, must be empty!`
                );
              }
            }
            // 
          } while (solution !== null && typeof solution === 'object');

          //
          // no solution found
          movesToUndo.forEach(cell => {
            this.cells[cell.row][cell.col] = this.unknownCell;
          });
          // + current cell still unknown
          this.cells[row][col] = this.unknownCell;
        }
      }
    }
    return null;
  }
  // fill unknown with empty and re-play until board is invalid. (inverse of above)
  methodFour() {
    // initiate new validator for current play
    const Validator = new GameValidator();
    // iterate board
    for (let row = 0; row < this.numberOfRows; row++) {
      for (let col = 0; col < this.numberOfCols; col++) {
        //
        if (this.cells[row][col] === this.unknownCell) {
          // place mine
          this.cells[row][col] = this.empty;
          // track moves
          const movesToUndo = [];
          let solution;
          do {
            // try method one
            solution = this.methodOne();
            if (solution === null) {
              // ../ method two
              solution = this.methodTwo();
            }
            // if solution found
            if (solution !== null && typeof solution === 'object') {
              // track updated cells
              movesToUndo.push(...solution.solvedCells);
              // validate board
              const result = Validator.validateBoard(this);
              //
              if (!result.isValid) {
                // reset currentCell
                this.cells[row][col] = this.mine;
                // reset the moves
                movesToUndo.forEach(cell => (this.cells[cell.row][cell.col] = this.unknownCell));
                //
                return new Solution(
                  result.cellOfInterest,
                  [ new CellLocation(row, col) ],
                  `cannot be empty must contain a mine!`
                );
              }
            }
            // 
          } while (solution !== null && typeof solution === 'object');

          //
          // no solution found
          movesToUndo.forEach(cell => {
            this.cells[cell.row][cell.col] = this.unknownCell;
          });
          // + current cell still unknown
          this.cells[row][col] = this.unknownCell;
        }
      }
    }
    return null;
  }
}
// expose
window.GameBoard = GameBoard
window.CellLocation= CellLocation