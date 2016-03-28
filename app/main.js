'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*  
Puzzle Mum 2016 - Puzzle games for my mother
============================================

(Shaun A. Noordin || shaunanoordin.com || 20160307)
********************************************************************************
 */

var CELL_EMPTY = 'empty';
var CELL_FILLED = 'filled';
var CELL_CROSSED = 'crossed';
var CURSOR_PEN = 0;
var CURSOR_X = 1;
var WHITE = 'white';
var GREY = 'grey';
var PINK = 'pink';
var GREEN = 'green';
var BLUE = 'blue';
var GOLD = 'gold';
var EMPTY_VALUE = WHITE;
var RENDER_SMALL = 0;
var RENDER_FULL = 1;

/*  Primary App Class
 */
//==============================================================================

var App = function () {
  function App() {
    _classCallCheck(this, App);

    //--------------------------------
    this.init();
    //--------------------------------
  }

  //----------------------------------------------------------------

  _createClass(App, [{
    key: 'init',
    value: function init() {
      this.container = document.getElementById('app');

      this.cursorMode = CURSOR_PEN;

      this.puzzle = new Puzzle(this, [[WHITE, WHITE, PINK, PINK, PINK, PINK, WHITE, WHITE, WHITE, PINK, PINK, PINK, PINK, WHITE, WHITE], [GOLD, PINK, GOLD, PINK, BLUE, PINK, GOLD, GOLD, GOLD, BLUE, BLUE, BLUE, GOLD, PINK, GOLD], [GOLD, GOLD, GOLD, BLUE, WHITE, BLUE, GOLD, WHITE, GOLD, BLUE, WHITE, BLUE, GOLD, GOLD, GOLD], [GOLD, PINK, GOLD, BLUE, BLUE, BLUE, GOLD, GOLD, PINK, BLUE, BLUE, PINK, PINK, GOLD, PINK], [GOLD, PINK, GOLD, BLUE, PINK, BLUE, GOLD, PINK, PINK, BLUE, PINK, PINK, PINK, GOLD, PINK], [PINK, PINK, PINK, GOLD, GOLD, GOLD, BLUE, BLUE, PINK, PINK, GOLD, PINK, BLUE, PINK, BLUE], [PINK, PINK, PINK, GOLD, WHITE, GOLD, BLUE, WHITE, BLUE, GOLD, WHITE, GOLD, BLUE, BLUE, BLUE], [PINK, PINK, PINK, GOLD, GOLD, PINK, BLUE, WHITE, BLUE, GOLD, GOLD, GOLD, PINK, BLUE, PINK], [WHITE, PINK, PINK, GOLD, WHITE, GOLD, BLUE, BLUE, PINK, GOLD, PINK, GOLD, PINK, BLUE, WHITE], [WHITE, WHITE, PINK, GOLD, GOLD, GOLD, PINK, PINK, PINK, PINK, PINK, PINK, PINK, WHITE, WHITE], [GREEN, GREEN, WHITE, GREEN, GREEN, PINK, GREEN, PINK, GREEN, PINK, GREEN, GREEN, WHITE, GREEN, GREEN], [GREEN, WHITE, GREEN, WHITE, GREEN, PINK, GREEN, PINK, GREEN, PINK, GREEN, WHITE, GREEN, WHITE, GREEN], [GREEN, WHITE, WHITE, WHITE, GREEN, PINK, GREEN, PINK, GREEN, PINK, GREEN, WHITE, WHITE, WHITE, GREEN], [GREEN, WHITE, WHITE, WHITE, GREEN, WHITE, GREEN, GREEN, GREEN, WHITE, GREEN, WHITE, WHITE, WHITE, GREEN], [WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, PINK, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE]]);
      /*new Puzzle(this, [
        [WHITE, WHITE, WHITE, BLUE,  BLUE,  BLUE,  WHITE, BLUE,  BLUE,  BLUE, ],
        [WHITE, BLUE,  BLUE,  PINK,  PINK,  PINK,  BLUE,  PINK,  PINK,  PINK, ],
        [BLUE,  PINK,  PINK,  WHITE, WHITE, WHITE, PINK,  WHITE, WHITE, WHITE,],
        [BLUE,  PINK,  WHITE, GOLD,  GREY,  GOLD,  GREY,  WHITE, GOLD,  GREY, ],
        [BLUE,  PINK,  WHITE, GOLD,  GREY,  GOLD,  GREY,  GOLD,  GREY,  GOLD,],
        [BLUE,  PINK,  WHITE, GOLD,  GOLD,  GOLD,  GREY,  GOLD,  GOLD,  GOLD, ],
        [WHITE, BLUE,  PINK,  GOLD,  GREY,  GOLD,  GREY,  GOLD,  GREY,  GOLD, ],
        [BLUE,  PINK,  PINK,  GOLD,  GREY,  GOLD,  GREY,  GOLD,  GREY,  GOLD, ],
        [BLUE,  PINK,  WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE,],
        [BLUE,  PINK,  WHITE, GOLD,  GOLD,  GREY,  WHITE, GOLD,  GOLD,  GOLD,],
      ]);*/

      this.container.appendChild(this.puzzle.html);
    }
  }]);

  return App;
}();
//==============================================================================

/*  Nonogram Puzzle Class
 */
//==============================================================================


var Puzzle = function () {
  function Puzzle(app, correctAnswer) {
    _classCallCheck(this, Puzzle);

    this.app = app;
    this.html = document.createElement("table");
    this.renderMode = RENDER_FULL;

    this.cells = [];
    this.colHeaderHtml = [];
    this.rowHeaderHtml = [];

    var width = 0;
    var height = 0;

    //Construct the cell array
    //--------------------------------
    for (var row = 0; row < correctAnswer.length; row++) {
      var newRow = [];
      for (var col = 0; col < correctAnswer[row].length; col++) {
        var newCell = new Cell(this, correctAnswer[row][col], col, row);
        newRow.push(newCell);
      }
      this.cells.push(newRow);
      width = correctAnswer[row].length;
    }
    height = correctAnswer.length;
    //--------------------------------

    //Create the HTML renders
    //--------------------------------
    if (this.cells.length >= 1) {
      var _newRow = document.createElement("tr");
      var newHeaderCell = document.createElement("td"); //Empty cell
      newHeaderCell.className = "non-header";
      _newRow.appendChild(newHeaderCell);
      for (var _col = 0; _col < this.cells[0].length; _col++) {
        var _newHeaderCell = document.createElement("td");
        _newHeaderCell.className = "col-header";
        _newRow.appendChild(_newHeaderCell);
        this.colHeaderHtml.push(_newHeaderCell);
      }
      this.html.appendChild(_newRow);
    }

    for (var _row = 0; _row < this.cells.length; _row++) {
      var _newRow2 = document.createElement("tr");
      var _newHeaderCell2 = document.createElement("td");
      _newHeaderCell2.className = "row-header";
      _newRow2.appendChild(_newHeaderCell2);
      this.rowHeaderHtml.push(_newHeaderCell2);

      for (var _col2 = 0; _col2 < this.cells[_row].length; _col2++) {
        _newRow2.appendChild(this.cells[_row][_col2].html);
      }

      this.html.appendChild(_newRow2);
    }
    //--------------------------------

    //Update headers
    //--------------------------------
    for (var _col3 = 0; _col3 < width; _col3++) {
      var values = [0];
      var lastCell = CELL_EMPTY;
      for (var _row2 = 0; _row2 < height; _row2++) {
        if (this.cells[_row2][_col3].correctAnswer == EMPTY_VALUE) {
          if (values[values.length - 1] > 0) {
            values.push(0);
          }
        } else {
          values[values.length - 1]++;
        }
      }
      var html = "";
      for (var i = 0; i < values.length; i++) {
        if (i == 0 || i > 0 && values[i] > 0) {
          html += "<span>" + values[i] + "</span>";
        }
      }
      this.colHeaderHtml[_col3].innerHTML = html;
    }

    for (var _row3 = 0; _row3 < height; _row3++) {
      var _values = [0];
      var _lastCell = CELL_EMPTY;
      for (var _col4 = 0; _col4 < width; _col4++) {
        if (this.cells[_row3][_col4].correctAnswer == EMPTY_VALUE) {
          if (_values[_values.length - 1] > 0) {
            _values.push(0);
          }
        } else {
          _values[_values.length - 1]++;
        }
      }
      var _html = "";
      for (var _i = 0; _i < _values.length; _i++) {
        if (_i == 0 || _i > 0 && _values[_i] > 0) {
          _html += "<span>" + _values[_i] + "</span>";
        }
      }
      this.rowHeaderHtml[_row3].innerHTML = _html;
    }
    //--------------------------------

    //--------------------------------
    this.paint();
    //--------------------------------
  }

  _createClass(Puzzle, [{
    key: 'verifyAnswers',
    value: function verifyAnswers() {
      var allAnswersCorrect = true;
      for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
          //TODO this.cells[row][col].;
          if ((this.cells[row][col].playerAnswer == CELL_EMPTY || this.cells[row][col].playerAnswer == CELL_CROSSED) && this.cells[row][col].correctAnswer == EMPTY_VALUE || this.cells[row][col].playerAnswer == CELL_FILLED && this.cells[row][col].correctAnswer != EMPTY_VALUE) {
            //Do nothing
          } else {
              allAnswersCorrect = false;
            }
        }
      }
      return allAnswersCorrect;
    }
  }, {
    key: 'paint',
    value: function paint() {
      if (this.renderMode == RENDER_SMALL) {
        this.html.className = "puzzle small";
      } else {
        this.html.className = "puzzle";
      }

      var answersCorrect = this.verifyAnswers();
      for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
          if (answersCorrect) {
            this.cells[row][col].html.className = this.cells[row][col].correctAnswer;
          } else {
            this.cells[row][col].html.className = this.cells[row][col].playerAnswer;
          }
        }
      }
    }
  }]);

  return Puzzle;
}();
//==============================================================================

/*  Puzzle Cell
 */
//==============================================================================


var Cell = function Cell(puzzle, value, x, y) {
  var _this = this;

  _classCallCheck(this, Cell);

  this.puzzle = puzzle;
  this.correctAnswer = value;
  this.playerAnswer = CELL_EMPTY;
  this.x = x;
  this.y = y;
  this.html = document.createElement("td");
  this.html.className = "cell";
  this.html.onclick = function () {
    if (_this.puzzle.renderMode == RENDER_SMALL) {
      _this.puzzle.renderMode = RENDER_FULL;
      _this.puzzle.paint();
      return;
    }

    if (_this.playerAnswer == CELL_EMPTY) {
      _this.playerAnswer = CELL_FILLED;
    } else if (_this.playerAnswer == CELL_FILLED) {
      _this.playerAnswer = CELL_CROSSED;
    } else {
      _this.playerAnswer = CELL_EMPTY;
    }
    _this.puzzle.paint();
  };
};
//==============================================================================

/*  Initialisations
 */
//==============================================================================


var app;
window.onload = function () {
  window.app = new App();
};
//==============================================================================