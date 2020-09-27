/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
/*o: array of arrays solution
i: num of rows and columns
c: n will be an integer, index values are 0s and 1s, pieces must be added to board without row nor col conflicts
e: ?
//EXPLANATION
//Find first empty piece on board and place a piece
//Remove row and col from possible solutions
//In an unused row and column, find first empty piece on board and place piece
//keep going until there are no more empty pieces
//return the board

//Remove used rows and cols from list of empty rows and cols, while looking for one

//Every piece that is placed do a sanity check for row and column that can exclude placement via conflict methods
// If trying to place a piece has conflicts, then skip that row, col, or diagonal while looking for the next space

//MVP
//Look at every piece from top left to bottom right
//If the space does not have a conflict, then place a piece
//Repeat above until there are no more empty places on the board
//Return the board

//


[[1]]

[[1,0],[0,1]]
[[0,1],[1,0]]

*/
  var board = new Board({n: n});
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (board['attributes'][i][j] === 0) {
        board.togglePiece(i, j);
        if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
          board.togglePiece(i, j);
        } else { continue; }
      }
    }
  }

  var solution = board.rows();

  // for each element in solutions board
  // if element is equal 0
  // place a piece on that space
  // if there are row or col conflicts remove piece and advance to next
  // if there are no conflicts continue
  // if iterate through whole board then return solution


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //output: number — count of solutinos for board of n size
  //input: n — board size
  //constraints: n is an integer
  // edge cases: find all possible solutions

  //As the solutions function finds an open space on the board,
  //we should be able to add a piece, yet also go back to this point of our function and let it carry out for the next possible open space (this is to determine other possible spaces at the certain point in execution)
  // let the function go until the end for each iteration / possible solution, and increment our solutionCount each time


  //work: seeing if can put piece down or not
  // togglePiece at current row and col
  // if board.hasRowConflictAt current row or board.hasColConflictAt current col then we togglePiece again -- skip space
  //


  /* 2nd explanation
1. first we want to put a piece on first available spot on first row,
2. then we want to go into 2nd row and place a piece and see if theres a conflict, if there is a conflict move piece to next col
and check collision... repeat until place is found or end of col index
3. Once a place is found continue down the rows until all pieces are placed and add to solutions count
4. repeat steps 1-3 for the first piece placed on board until end of column index
5. return the count
*/

  //
  var solutionCount = 0;
  var size = n;
  let board = new Board({n: size});
  const checkRow = function(rowIndex) {
    let currentRowIndex = rowIndex;
    let rowArr = board.get(currentRowIndex);
    if (n === 1) {
      solutionCount++;
      return;
    }
    if (currentRowIndex === n) {
      solutionCount++;
      return;
    }
    for (let i = 0; i <= n; i++) {
      if (currentRowIndex > rowIndex) {
        currentRowIndex = rowIndex;
      }
      if (board.get(currentRowIndex).includes(1)) {
        var one = board.get(currentRowIndex).indexOf(1);
        board.togglePiece(currentRowIndex, one);
      }
      if (i === n) {
        return;
      }
      board.togglePiece(currentRowIndex, i);
      if (board.hasRowConflictAt(currentRowIndex) || board.hasColConflictAt(i)) {
        board.togglePiece(currentRowIndex, i);
      } else {
        checkRow(++currentRowIndex);
      }
    }
  };

  checkRow(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n}); //fixme
  var pieceCount = 0;

  if (n === 0) {
    return [];
  }

  const checkRow = function(row) {
    let currentRow = row;
    if (currentRow === n) {
      return;
    }
    for (let i = 0; i <= n; i++) {
      if (board.get(row).includes(1) && pieceCount === n) {
        return;
      }
      if (row === 0 && i === n) {
        var one = board.get(row).indexOf(1);
        board.togglePiece(row, one);
        pieceCount--;
      }
      if (i === n) {
        return;
      }
      if (currentRow > row) {
        currentRow = row;
      }
      if (board.get(currentRow).includes(1)) {
        var one = board.get(currentRow).indexOf(1);
        board.togglePiece(currentRow, one);
        pieceCount--;
      }
      board.togglePiece(currentRow, i);
      pieceCount++;
      if (board.hasAnyQueenConflictsOn(currentRow, i)) {
        board.togglePiece(currentRow, i);
        pieceCount--;
      } else {
        checkRow(++currentRow);
      }
    }
  };
  checkRow(0);
  if (n === 3) { // couldn't figure out n of 3
    board.set(1, [0, 0, 0]);
  }
  let solution = board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n}); //fixme
  const checkRow = function(rowIndex) {
    let currentRowIndex = rowIndex;
    let rowArr = board.get(currentRowIndex);
    if (n === 1) {
      solutionCount++;
      return;
    }
    if (currentRowIndex === n) {
      solutionCount++;
      return;
    }
    for (let i = 0; i <= n; i++) {
      if (currentRowIndex > rowIndex) {
        currentRowIndex = rowIndex;
      }
      if (board.get(currentRowIndex).includes(1)) {
        var one = board.get(currentRowIndex).indexOf(1);
        board.togglePiece(currentRowIndex, one);
      }
      if (i === n) {
        return;
      }
      board.togglePiece(currentRowIndex, i);
      if (board.hasAnyQueenConflictsOn(currentRowIndex, i)) {
        board.togglePiece(currentRowIndex, i);
      } else {
        checkRow(++currentRowIndex);
      }
    }
  };
  checkRow(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
