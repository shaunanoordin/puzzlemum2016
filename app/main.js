"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*  
Puzzle Mum 2016 - Puzzle games for my mother
============================================

(Shaun A. Noordin || shaunanoordin.com || 20160307)
********************************************************************************
 */

/*  Primary App Class
 */
//==============================================================================

var App = function () {
  function App() {
    _classCallCheck(this, App);

    //--------------------------------
    App.FRAMES_PER_SECOND = 1;
    //--------------------------------

    //--------------------------------
    this.container = document.getElementById("app");
    this.console = document.getElementById("console");
    //--------------------------------

    //--------------------------------
    this.runCycle = setInterval(this.run.bind(this), 1000 / App.FRAMES_PER_SECOND);
    //--------------------------------
  }

  //----------------------------------------------------------------

  _createClass(App, [{
    key: "run",
    value: function run() {
      this.console.innerHTML += '1';
    }
  }]);

  return App;
}();
//==============================================================================

/*  Initialisations
 */
//==============================================================================


var app;
window.onload = function () {
  window.app = new App();
};
//==============================================================================