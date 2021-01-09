require('../js/GameBoard')
// game contsructor
const GameBoard = window.GameBoard

describe('Tests for the Game', () => {
  
  test('should successfully invoke constructor', () => {
    const initialState = [new Array(3),new Array(3)]
    const currentGame = new GameBoard(initialState)
    expect(currentGame).toBeDefined()
  })

  test('should calculate and set width and height of grid', () => {
    const initialState = [new Array(3),new Array(3)]
    const currentGame = new GameBoard(initialState)
    expect(currentGame).toBeDefined()
    expect(currentGame.numberOfRows).toEqual(2)
    expect(currentGame.numberOfCols).toEqual(3)
  })

  
})
