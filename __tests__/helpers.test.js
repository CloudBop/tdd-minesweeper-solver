require('../js/helpers')
const {gridFromStringLiteral} = window.helpers

describe('tests for helper functions', () => {
  test('should generate grid (2d array) from string ',()=>{
// careful, string-literal
const strPuzzle1 = `
0   1 11
   3    `;

    var result = gridFromStringLiteral(strPuzzle1)
    // top row
    expect(result[0][0]).toEqual("0")
    expect(result[0][1]).toEqual(" ")
    expect(result[0][2]).toEqual(" ")
    expect(result[0][4]).toEqual("1")
    expect(result[0][5]).toEqual(" ")
    expect(result[0][6]).toEqual("1")
    expect(result[0][7]).toEqual("1")

    expect(result[1][0]).toEqual(" ")
    expect(result[1][3]).toEqual("3")
    
  })
})
