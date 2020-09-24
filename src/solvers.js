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
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
