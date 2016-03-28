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
var ORANGE = 'orange';
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
    //App.FRAMES_PER_SECOND = 1;
    //--------------------------------

    //--------------------------------
    this.init();
    //this.runCycle = setInterval(this.run.bind(this), 1000 / App.FRAMES_PER_SECOND);
    //--------------------------------
  }

  //----------------------------------------------------------------

  _createClass(App, [{
    key: 'init',
    value: function init() {
      this.container = document.getElementById('app');
      this.console = document.getElementById('console');

      this.cursorMode = CURSOR_PEN;

      this.puzzles = [new Puzzle(this, [[WHITE, WHITE, WHITE, BLUE, BLUE, BLUE, WHITE, BLUE, BLUE, BLUE], [WHITE, BLUE, BLUE, WHITE, WHITE, WHITE, BLUE, WHITE, WHITE, WHITE], [BLUE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE], [BLUE, WHITE, WHITE, WHITE, GREY, WHITE, GREY, WHITE, WHITE, GREY], [BLUE, WHITE, WHITE, WHITE, GREY, WHITE, GREY, WHITE, GREY, WHITE], [BLUE, WHITE, WHITE, WHITE, GREY, GREY, GREY, WHITE, GREY, GREY], [WHITE, BLUE, WHITE, WHITE, GREY, WHITE, GREY, WHITE, GREY, WHITE], [BLUE, WHITE, WHITE, WHITE, GREY, WHITE, GREY, WHITE, GREY, WHITE], [BLUE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE], [BLUE, WHITE, WHITE, WHITE, GREY, GREY, WHITE, WHITE, GREY, GREY]])];

      this.container.appendChild(this.puzzles[0].html);
    }

    //----------------------------------------------------------------

  }, {
    key: 'run',
    value: function run() {}
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
    this.html.className = "puzzle";

    this.cells = [];
    this.colHeaderHtml = [];
    this.rowHeaderHtml = [];

    //Construct the cell array
    //--------------------------------
    for (var row = 0; row < correctAnswer.length; row++) {
      var newRow = [];
      for (var col = 0; col < correctAnswer[row].length; col++) {
        var newCell = new Cell(this, correctAnswer[row][col], col, row);
        newRow.push(newCell);
      }
      this.cells.push(newRow);
    }
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
          if (this.cells[row][col].playerAnswer == CELL_EMPTY && this.cells[row][col].correctAnswer == EMPTY_VALUE || this.cells[row][col].playerAnswer != CELL_EMPTY && this.cells[row][col].correctAnswer != EMPTY_VALUE) {
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
      console.log("PAINT");
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
    if (_this.playerAnswer != CELL_EMPTY) {
      _this.playerAnswer = CELL_EMPTY;
    } else {
      _this.playerAnswer = CELL_FILLED;
    }
    console.log(_this.playerAnswer);
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