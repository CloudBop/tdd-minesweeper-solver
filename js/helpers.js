const gridFromStringLiteral = (stringLiteral) =>{
  //
  if(typeof stringLiteral !== 'string') return

  // split string using \n (line break) seperator
  const rows = stringLiteral.split('\n');
  // '/n' before puzzle string start on initial line ``
  if (rows[0] === '') rows.shift();
  // loop over chars in new array and split by char (including spaces, persistsed via ES6 ``)
  const grid = rows.map(row => row.split(''));
  return grid
}


window.helpers = {
  gridFromStringLiteral
}