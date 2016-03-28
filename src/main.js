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
const GOLD = 'gold';
const EMPTY_VALUE = WHITE;
const RENDER_SMALL = 0;
const RENDER_FULL = 1;
 
/*  Primary App Class
 */
//==============================================================================
class App {
    
  constructor() {
    //--------------------------------
    this.init();
    //--------------------------------
  }
  
  //----------------------------------------------------------------
  
  init() {
    this.container = document.getElementById('app');
    
    this.cursorMode = CURSOR_PEN;
    
    this.puzzle =
      new Puzzle(this, [
        [WHITE, WHITE, PINK,  PINK,  PINK,   PINK,  WHITE, WHITE, WHITE, PINK,   PINK,  PINK,  PINK,  WHITE, WHITE,],
        [GOLD,  PINK,  GOLD,  PINK,  BLUE,   PINK,  GOLD,  GOLD,  GOLD,  BLUE,   BLUE,  BLUE,  GOLD,  PINK,  GOLD, ],
        [GOLD,  GOLD,  GOLD,  BLUE,  WHITE,  BLUE,  GOLD,  WHITE, GOLD,  BLUE,   WHITE, BLUE,  GOLD,  GOLD,  GOLD, ],
        [GOLD,  PINK,  GOLD,  BLUE,  BLUE,   BLUE,  GOLD,  GOLD,  PINK,  BLUE,   BLUE,  PINK,  PINK,  GOLD,  PINK, ],
        [GOLD,  PINK,  GOLD,  BLUE,  PINK,   BLUE,  GOLD,  PINK,  PINK,  BLUE,   PINK,  PINK,  PINK,  GOLD,  PINK, ],
        
        [PINK,  PINK,  PINK,  GOLD, GOLD,    GOLD,  BLUE,  BLUE,  PINK,  PINK,   GOLD,  PINK,  BLUE,  PINK,  BLUE, ],
        [PINK,  PINK,  PINK,  GOLD, WHITE,   GOLD,  BLUE,  WHITE, BLUE,  GOLD,   WHITE, GOLD,  BLUE,  BLUE,  BLUE, ],
        [PINK,  PINK,  PINK,  GOLD, GOLD,    PINK,  BLUE,  WHITE, BLUE,  GOLD,   GOLD,  GOLD,  PINK,  BLUE,  PINK, ],
        [WHITE, PINK,  PINK,  GOLD, WHITE,   GOLD,  BLUE,  BLUE,  PINK,  GOLD,   PINK,  GOLD,  PINK,  BLUE,  WHITE,],
        [WHITE, WHITE, PINK,  GOLD, GOLD,    GOLD,  PINK,  PINK,  PINK,  PINK,   PINK,  PINK,  PINK,  WHITE, WHITE,],
        
        [GREEN, GREEN, WHITE, GREEN, GREEN,  PINK,  GREEN, PINK,  GREEN, PINK,   GREEN, GREEN, WHITE, GREEN, GREEN,],
        [GREEN, WHITE, GREEN, WHITE, GREEN,  PINK,  GREEN, PINK,  GREEN, PINK,   GREEN, WHITE, GREEN, WHITE, GREEN,],
        [GREEN, WHITE, WHITE, WHITE, GREEN,  PINK,  GREEN, PINK,  GREEN, PINK,   GREEN, WHITE, WHITE, WHITE, GREEN,],
        [GREEN, WHITE, WHITE, WHITE, GREEN,  WHITE, GREEN, GREEN, GREEN, WHITE,  GREEN, WHITE, WHITE, WHITE, GREEN,],
        [WHITE, WHITE, WHITE, WHITE, WHITE,  WHITE, WHITE, PINK,  WHITE, WHITE,  WHITE, WHITE, WHITE, WHITE, WHITE,],
      ]);
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
}
//==============================================================================

/*  Nonogram Puzzle Class
 */
//==============================================================================
class Puzzle {
  constructor(app, correctAnswer) {
    this.app = app;
    this.html = document.createElement("table");
    this.renderMode = RENDER_FULL;
    
    this.cells = [];
    this.colHeaderHtml = [];
    this.rowHeaderHtml = [];
    
    let width = 0;
    let height = 0;
    
    //Construct the cell array
    //--------------------------------
    for (let row = 0; row < correctAnswer.length; row++) {
      let newRow = [];
      for (let col = 0; col < correctAnswer[row].length; col++) {
        let newCell = new Cell(this, correctAnswer[row][col], col, row);
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
    
    //Update headers
    //--------------------------------
    for (let col = 0; col < width; col++) {
      let values = [0];
      let lastCell = CELL_EMPTY;
      for (let row = 0; row < height; row++) {
        if (this.cells[row][col].correctAnswer == EMPTY_VALUE) {
          if (values[values.length-1] > 0 ) {
            values.push(0);
          }
        } else {
          values[values.length-1]++;
        }
      }
      let html = "";
      for (let i = 0; i < values.length; i++) {
        if (i == 0 || (i > 0 && values[i] > 0)) {
          html += "<span>"+values[i]+"</span>";
        }
      }
      this.colHeaderHtml[col].innerHTML = html;
    }
    
    for (let row = 0; row < height; row++) {
      let values = [0];
      let lastCell = CELL_EMPTY;
      for (let col = 0; col < width; col++) {
        if (this.cells[row][col].correctAnswer == EMPTY_VALUE) {
          if (values[values.length-1] > 0 ) {
            values.push(0);
          }
        } else {
          values[values.length-1]++;
        }
      }
      let html = "";
      for (let i = 0; i < values.length; i++) {
        if (i == 0 || (i > 0 && values[i] > 0)) {
          html += "<span>"+values[i]+"</span>";
        }
      }
      this.rowHeaderHtml[row].innerHTML = html;
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
        if (((this.cells[row][col].playerAnswer == CELL_EMPTY ||
              this.cells[row][col].playerAnswer == CELL_CROSSED) &&
             this.cells[row][col].correctAnswer == EMPTY_VALUE) ||
            (this.cells[row][col].playerAnswer == CELL_FILLED &&
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
    if (this.renderMode == RENDER_SMALL) {
      this.html.className = "puzzle small";
    } else {
      this.html.className = "puzzle";
    }
    
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
      if (this.puzzle.renderMode == RENDER_SMALL) {
        this.puzzle.renderMode = RENDER_FULL;
        this.puzzle.paint();
        return;
      }
      
      if (this.playerAnswer == CELL_EMPTY) {
        this.playerAnswer = CELL_FILLED;
      } else if (this.playerAnswer == CELL_FILLED) {
        this.playerAnswer = CELL_CROSSED;
      } else {
        this.playerAnswer = CELL_EMPTY;
      }
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
