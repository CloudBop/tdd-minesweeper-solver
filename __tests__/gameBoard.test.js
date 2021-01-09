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


  test('should set cells from 2d array, inc special chars', ()=>{

    const initialState = [new Array(3),new Array(3)]
    const currentGame = new GameBoard(initialState)
    //
    currentGame.stateStateFromArray([
      ["0", "-1", "-2" ,"-3"],
      [" ", "8", " " ,"4"]
    ])

    const result= {
      cell1: currentGame.cellContents(0,0),
      cell2: currentGame.cellContents(1,1),
      cell3: currentGame.cellContents(3,1),

      cell4: currentGame.cellContents(1,0),
      cell5: currentGame.cellContents(2,0),
      cell6: currentGame.cellContents(3,0),
    }

    expect(result.cell1).toEqual(0)
    expect(result.cell2).toEqual(8)
    expect(result.cell3).toEqual(4)
    expect(result.cell4).toEqual("")
    expect(result.cell5).toEqual("!")
    expect(result.cell6).toEqual("x")
  })
})
