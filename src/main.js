/*  
Puzzle Mum 2016 - Puzzle games for my mother
============================================

(Shaun A. Noordin || shaunanoordin.com || 20160307)
********************************************************************************
 */

const CELL_EMPTY = 'empty';
const CELL_FILLED = 'filled';
const CELL_CROSSED = 'crossed';
const CURSOR_PEN = 0;
const CURSOR_X = 1;
const WHITE = 'white';
const GREY = 'grey';
const PINK = 'pink';
const GREEN = 'green';
const BLUE = 'blue';
const ORANGE = 'orange';
const EMPTY_VALUE = WHITE;
const RENDER_SMALL = 0;
const RENDER_FULL = 1;
 
/*  Primary App Class
 */
//==============================================================================
class App {
    
  constructor() {
    //--------------------------------
    //App.FRAMES_PER_SECOND = 1;
    //--------------------------------
    
    //--------------------------------
    this.init();
    //this.runCycle = setInterval(this.run.bind(this), 1000 / App.FRAMES_PER_SECOND);
    //--------------------------------
  }
  
  //----------------------------------------------------------------
  
  init() {
    this.container = document.getElementById('app');
    this.console = document.getElementById('console');
    
    this.cursorMode = CURSOR_PEN;
    
    this.puzzles = [
      new Puzzle(this, [
        [WHITE, WHITE, WHITE, BLUE,  BLUE,  BLUE,  WHITE, BLUE,  BLUE,  BLUE, ],
        [WHITE, BLUE,  BLUE,  WHITE, WHITE, WHITE, BLUE,  WHITE, WHITE, WHITE,],
        [BLUE,  WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE,],
        [BLUE,  WHITE, WHITE, WHITE, GREY,  WHITE, GREY,  WHITE, WHITE, GREY, ],
        [BLUE,  WHITE, WHITE, WHITE, GREY,  WHITE, GREY,  WHITE, GREY,  WHITE,],
        [BLUE,  WHITE, WHITE, WHITE, GREY,  GREY,  GREY,  WHITE, GREY,  GREY, ],
        [WHITE, BLUE,  WHITE, WHITE, GREY,  WHITE, GREY,  WHITE, GREY,  WHITE,],
        [BLUE,  WHITE, WHITE, WHITE, GREY,  WHITE, GREY,  WHITE, GREY,  WHITE,],
        [BLUE,  WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE,],
        [BLUE,  WHITE, WHITE, WHITE, GREY,  GREY,  WHITE, WHITE, GREY,  GREY, ],
      ])
    ];
    
    this.container.appendChild(this.puzzles[0].html);
  }
  
  //----------------------------------------------------------------
  
  run() {
  }

}
//==============================================================================

/*  Nonogram Puzzle Class
 */
//==============================================================================
class Puzzle {
  constructor(app, correctAnswer) {
    this.app = app;
    this.html = document.createElement("table");
    this.html.className = "puzzle";
    
    this.cells = [];
    this.colHeaderHtml = [];
    this.rowHeaderHtml = [];
    
    //Construct the cell array
    //--------------------------------
    for (let row = 0; row < correctAnswer.length; row++) {
      let newRow = [];
      for (let col = 0; col < correctAnswer[row].length; col++) {
        let newCell = new Cell(this, correctAnswer[row][col], col, row);
        newRow.push(newCell);
      }
      this.cells.push(newRow);
    }
    //--------------------------------
    
    //Create the HTML renders
    //--------------------------------
    if (this.cells.length >= 1) {
      let newRow = document.createElement("tr");
      let newHeaderCell = document.createElement("td");  //Empty cell
      newHeaderCell.className = "non-header";
      newRow.appendChild(newHeaderCell);
      for (let col = 0; col < this.cells[0].length; col++) {
        let newHeaderCell = document.createElement("td");
        newHeaderCell.className = "col-header";
        newRow.appendChild(newHeaderCell);
        this.colHeaderHtml.push(newHeaderCell);
      }
      this.html.appendChild(newRow);
    }
    
    for (let row = 0; row < this.cells.length; row++) {
      let newRow = document.createElement("tr");
      let newHeaderCell = document.createElement("td");
      newHeaderCell.className = "row-header";
      newRow.appendChild(newHeaderCell);
      this.rowHeaderHtml.push(newHeaderCell);
      
      for (let col = 0; col < this.cells[row].length; col++) {
        newRow.appendChild(this.cells[row][col].html);
      }
      
      this.html.appendChild(newRow);
    }
    //--------------------------------
    
    //--------------------------------
    this.paint();
    //--------------------------------
  }
  
  verifyAnswers() {
    let allAnswersCorrect = true;
    for (let row = 0; row < this.cells.length; row++) {
      for (let col = 0; col < this.cells[row].length; col++) {
        //TODO this.cells[row][col].;
        if ((this.cells[row][col].playerAnswer == CELL_EMPTY &&
             this.cells[row][col].correctAnswer == EMPTY_VALUE) ||
            (this.cells[row][col].playerAnswer != CELL_EMPTY &&
             this.cells[row][col].correctAnswer != EMPTY_VALUE)) {
          //Do nothing
        } else {
          allAnswersCorrect = false;
        }
      }
    }
    return allAnswersCorrect;
  }
  
  paint() {
    console.log("PAINT");
    let answersCorrect = this.verifyAnswers();
    for (let row = 0; row < this.cells.length; row++) {      
      for (let col = 0; col < this.cells[row].length; col++) {
        if (answersCorrect) {
          this.cells[row][col].html.className = this.cells[row][col].correctAnswer;
        } else {
          this.cells[row][col].html.className = this.cells[row][col].playerAnswer;
        }
      }
    }
  }
}
//==============================================================================

/*  Puzzle Cell
 */
//==============================================================================
class Cell {
  constructor(puzzle, value, x, y) {
    this.puzzle = puzzle;
    this.correctAnswer = value;
    this.playerAnswer = CELL_EMPTY;
    this.x = x;
    this.y = y;
    this.html = document.createElement("td");
    this.html.className = "cell";
    this.html.onclick = () => {
      if (this.playerAnswer != CELL_EMPTY) {
        this.playerAnswer = CELL_EMPTY;
      } else {
        this.playerAnswer = CELL_FILLED;
      }
      console.log(this.playerAnswer);
      this.puzzle.paint();
    };
  }
}
//==============================================================================


/*  Initialisations
 */
//==============================================================================
var app;
window.onload = function() {
  window.app = new App();
};
//==============================================================================
