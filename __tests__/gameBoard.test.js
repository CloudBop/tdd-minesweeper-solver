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

  test('should return correct cell value', () => {
    const initialState = [new Array(3),new Array(3)]
    
    initialState[0][1] = 7
    initialState[1][2] = 1 

    const currentGame = new GameBoard(initialState)
    const result ={
      cell1: currentGame.cellContents(1,0),
      cell2: currentGame.cellContents(2,1)
    }
  
    expect(result.cell1).toEqual(7)
    expect(result.cell2).toEqual(1)
  })
  
})
