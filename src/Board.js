// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

// var myBoard = new Board({n: 4});
(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // create variable for current row
      let currentRow = this.get(rowIndex);
      let sum = 0;
      for ( let i = 0; i < currentRow.length; i++) {
        if (currentRow[i] === 1) {
          sum++;
        }
      }
      if (sum > 1) {
        return true;
      }

      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let rows = this.attributes.n;

      for ( let i = 0; i < rows; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // var for count of pieces in column

      // loop through n rows
      // every time there is a piece in colIndex, increment the sum
      // if sum is > 1 return true
      //else return false
      var sum = 0;
      for (var i = 0; i < this.attributes.n; i++) {
        var row = this.get(i);
        if (row[colIndex] === 1) { sum++; }
        if (sum > 1) { return true; }
      }

      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // check for column conflicts for each index of the row
      // return true if there are conflicts
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow, sum = 0) {
      //collect the matrix
      let board = this.rows();
      let indexStart = majorDiagonalColumnIndexAtFirstRow;

      // if indexStart is greater than equal to 0
      //var col = index start
      // var rowindex = 0
      // while col < n
      // if the row[col] in the matrix === 1, then increment sum
      // increment row++ and col++
      if (indexStart >= 0) {
        let col = indexStart;
        let row = 0;
        while ( col < this.attributes.n) {
          if (board[row][col] === 1) {
            sum++;
          }
          row++;
          col++;
        }
      }

      // if indexStart is < 0
      // var col = 0
      // var row = absolute value indexStart
      // while row < n
      // if the row and col in matrix ===1, then increment sum
      // increment row++ and col++
      if (indexStart < 0) {
        let col = 0;
        let row = Math.abs(indexStart);
        while (row < this.attributes.n) {
          if (board[row][col] === 1) {
            sum++;
          }
          row++;
          col++;
        }
      }




      if (sum > 1) {
        return true;
      }

      return false; // fixme
    },
    // if sum > 1 return true
    //else false




    // start at first row col index
    //see if there's a piece
    //if there is, then increment sum
    // if sum equals 2 then return true
    //increment row and col index for next iteration
    // repeat above until col index is equal to n-1 or row index is equal to n-1


    // pass value through getFirstRowColIndex function
    //increment mDCAIR on next row, for each iteration
    //if incremented mDCAIR = 1, then increment sum



    //if sum > 1 return true else false

    // 2:0
    // 3:-1
    // 4:-2
    // 5:-3

    // 4x4 can have -2
    //  21[0,1,2,3]
    //   2[1,0,0,2]
    //    [2,0,0,0]
    //    [3,2,0,0]


    // 4x4 can have -2
    //  -1[0,0,0,0]
    //    [0,0,0,0]
    //    [0,0,0,0]
    //    [0,0,0,0]

    // 3x3 can -1
    // [1,0,0]
    // [0,1,0]
    // [0,0,1]

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //traverse through each row
      var size = this.attributes.n;
      var low = -(size - 2);
      var high = size - 1;
      while (low < high) {
        if (this.hasMajorDiagonalConflictAt(low)) {
          return true;
        }
        low++;
      }
      return false; // fixme
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow, sum = 0) {
      var n = this.attributes.n;
      var board = this.rows();
      var indexStart = minorDiagonalColumnIndexAtFirstRow;
      if (indexStart >= n) {
        var col = n - 1;
        var row = indexStart - n + 1;
        while (row <= n - 1) {
          if (board[row][col] === 1) {
            sum++;
          }
          row++;
          col--;
        }
      } else {
        var col = indexStart;
        var row = 0;
        while (col >= 0) {
          if (board[row][col] === 1) {
            sum++;
          }
          row++;
          col--;
        }
      }
      if (sum > 1) { return true; }
      return false; // fixme
    },
    // if index start is greater or equal to n
    // while row < n-1
    // start on row = columnindex - n + 1 at end of row (n-1)
    // if that element is a piece
    // sum ++
    // row ++
    // col --
    // otherwise
    // while col >= 0
    // col start on index start, row 0
    // if theres a piece
    // row++, col--
    // add to sum
    // if the sum is greater than 1
    // return true

    //    [0,0,0,0]n ....2n-3
    //    [0,0,0,0]
    //    [0,0,0,0]
    //    [0,0,0,0]


    //    [,1,2,3]456
    //    [1,0,0,4]
    //    [2,0,4,5]
    //    [3,4,5,0]

    //n-1 + n-2 = 2n-3


    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let size = this.attributes.n;
      for (let i = 1; i <= 2 * (size) - 3; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
