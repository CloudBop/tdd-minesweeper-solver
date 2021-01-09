class GameValidator {
  // constructor() {}
  validateBoard(game) {
    // checks there are no imposible situations, IE a minecount of 8 with a neighbour=== typeof number
    //
    for (let row = 0; row < game.numberOfRows; row++) {
      for (let col = 0; col < game.numberOfCols; col++) {
        // int:
        const mineCount = game.doesCellContainsMineCount(row, col);
        // (false >= 0) === true - ?avascript
        if (mineCount >= 0) {
          const neighboursWithMines = game.neighboursWithMines(row, col).length;
          //
          if (neighboursWithMines > mineCount) {
            //
            return new ValidationResult(false, 'Too many mines', new CellLocation(row, col, mineCount));
          }
        }
      }
    }
  
    return new ValidationResult(true, 'OK');
  }
}

class ValidationResult {
  constructor(isValid = false, description = 'init', cellOfInterest = null) {
    this.isValid = isValid;
    this.description = description;
    this.cellOfInterest = cellOfInterest;
  }
}

window.GameValidator = GameValidator