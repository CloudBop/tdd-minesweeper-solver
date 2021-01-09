require('../js/helpers.js')
require('../js/GameBoard')
require('../js/validateGame')

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
 
// game contsructor
const GameBoard = window.GameBoard
const GameValidator = window.GameValidator
const {
  gridFromStringLiteral
} = window.helpers

describe('Test for validating the board', () => {
  test('Cell[0][0] minecount == 0, but there is a neighbouring mine ', () => {
    const initialState = [new Array(3),new Array(3)]
    const currentGame = new GameBoard(initialState)
    currentGame.stateStateFromArray(gridFromStringLiteral(strPuzzle1))

    // invalidate the board, make this a mine
    currentGame.cells[1][0] = -2

    const validator = new GameValidator()
    let validationResult = validator.validateBoard(currentGame)
    
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.description).toBe("Too many mines");
    expect(validationResult.cellOfInterest.col).toBe(0)
    expect(validationResult.cellOfInterest.row).toBe(0)
  })
  //
  test('Cell[0][0] minecount == 0, but there is a neighbouring mine ', () => {
    const initialState = [new Array(3),new Array(3)]
    const currentGame = new GameBoard(initialState)
    currentGame.stateStateFromArray(gridFromStringLiteral(strPuzzle1))

    // invalidate the board, make this a mine
    currentGame.cells[1][0] = -2

    const validator = new GameValidator()
    let validationResult = validator.validateBoard(currentGame)
    
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.description).toBe("Too many mines");
    expect(validationResult.cellOfInterest.col).toBe(0)
    expect(validationResult.cellOfInterest.row).toBe(0)
  })

})
