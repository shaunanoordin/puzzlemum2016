'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*  
Puzzle Mum 2016 - Puzzle games for my mother
============================================

(Shaun A. Noordin || shaunanoordin.com || 20160307)
********************************************************************************
 */

var CELL_EMPTY = '';
var CELL_FILLED = 'filled';
var CELL_CROSSED = 'crossed';
var WHITE = '#ffffff';
var GREY = '#666666';
var PINK = '#ff9999';
var GREEN = '#66cc99';
var BLUE = '#66ccff';
var ORANGE = '#ffcc33';
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

      this.puzzles = [new Puzzle(this, [[WHITE, WHITE, WHITE, BLUE, BLUE, BLUE, WHITE, BLUE, BLUE, BLUE], [WHITE, BLUE, BLUE, WHITE, WHITE, WHITE, BLUE, WHITE, WHITE, WHITE]])];

      this.container.appendChild(this.puzzles[0].html);

      alert(this.console);
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
    console.log(this.cells);
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
  }

  _createClass(Puzzle, [{
    key: 'verifyAnswers',
    value: function verifyAnswers() {}
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
    alert(_this.x + "," + _this.y + ":" + _this.correctAnswer);
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