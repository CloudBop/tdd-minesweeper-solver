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
  test('Cell[2][0] - minecount == 1, but there is two neighbouring mines ', () => {
    const initialState = [new Array(3),new Array(3)]
    const currentGame = new GameBoard(initialState)
    currentGame.stateStateFromArray(gridFromStringLiteral(strPuzzle1))

    // turn this to focus on different cell
    currentGame.cells[0][0] = 3
    // invalidate the board, make this a mine
    currentGame.cells[1][0] = -2
    currentGame.cells[1][1] = -2

    const validator = new GameValidator()
    let validationResult = validator.validateBoard(currentGame)
    
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.description).toBe("Too many mines");
    expect(validationResult.cellOfInterest.col).toBe(0)
    expect(validationResult.cellOfInterest.row).toBe(2)
  })
  //
  test('cannot place more mines around minecount ', () => {
    const initialState = [new Array(3),new Array(3)]
    const currentGame = new GameBoard(initialState)
    currentGame.stateStateFromArray(gridFromStringLiteral(strPuzzle1))

    // invalidate board
    currentGame.cells[2][3] = 8

    const validator = new GameValidator()
    let validationResult = validator.validateBoard(currentGame)
    //
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.description).toBe("Too few mines");
    expect(validationResult.cellOfInterest.row).toBe(2)
    expect(validationResult.cellOfInterest.col).toBe(3)
  })


  test('should be valid board', ()=>{
    const initialState = [new Array(3),new Array(3)]
    const currentGame = new GameBoard(initialState)
    currentGame.stateStateFromArray(gridFromStringLiteral(strPuzzle1))

    const validator = new GameValidator()
    let validationResult = validator.validateBoard(currentGame)

    expect(validationResult.isValid).toBe(true)

  })

})
