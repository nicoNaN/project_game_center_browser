"use strict";

var view = {
  init: function() {
    this.attachDirListener();
    this.render();
  },

  render: function() {
    var totalScore = model.getScore();
    $("#score").text(totalScore);
    this.drawBoard();
    this.placeFood();
    setInterval(function() {
      view.drawSnake(model.getCurrentDirection());
    }, 1000);
  },

  drawBoard: function() {
    for (var i = 1; i <= model.gridSize; i++) {
      this.addRowsCols($("#snake-grid"), model.gridSize, i);
    }
  },

  addRowsCols: function(board, numColumns, rowVal) {
    board.append("<div class='row'" + " data-y=" + rowVal + "></div>");
    for (var i = 1; i <= numColumns; i++) {
      $("#snake-grid .row").last().append("<div class='col'" + " data-x=" + i + "></div>");
    }
  },

  placeFood: function() {
    var randx = Math.floor((Math.random() * 10 ) + 1);
    var randy = Math.floor((Math.random() * 10 ) + 1);

    var row = $(".row[data-y=" + randy + "]");
    $(row).children().eq(randx-1).addClass('food');
  },

  drawSnake: function(direction) {
    var prevPos = $("div[data-y=" + model.getSnakeY() + "] div[data-x=" + model.getSnakeX() + "]");

    if (direction == "up") {
      model.moveUp();
    } else if (direction == "down") {
      model.moveDown();
    } else if (direction == "left") {
      model.moveLeft();
    } else if (direction == "right") {
      model.moveRight();
    };

    var currentPos = $("div[data-y=" + model.getSnakeY() + "] div[data-x=" + model.getSnakeX() + "]");
    $(prevPos).removeClass("snake");
    $(currentPos).addClass("snake");

  },

  attachDirListener: function(){
    $(window).keydown(function(press){
      if(press.which === 38){
         controller.setCurrentDirection("up");
      } else if(press.which === 40){
         controller.setCurrentDirection("down");
      } else if(press.which === 37){
         controller.setCurrentDirection("left");
      } else if(press.which === 39){
         controller.setCurrentDirection("right");
      }
    });
  }
};

var model = {

  snakeX: 1,
  snakeY: 10,

  currentDirection: "up",

  gridSize: 10,
  totalScore: 0,

  moveUp: function() {
    this.snakeY--;
  },

  moveDown: function() {
    this.snakeY++;
  },

  moveLeft: function() {
    this.snakeX--;
  },

  moveRight: function() {
    this.snakeX++;
  },

  getScore: function() {
    return this.totalScore;
  },

  getCurrentDirection: function() {
    return this.currentDirection;
  },

  getSnakeX: function() {
    return this.snakeX;
  },

  getSnakeY: function() {
    return this.snakeY;
  },

  addSnakeX: function() {
    this.snakeX++;
  }
};

var controller = {
  init: function() {
    view.init();
  },

  setCurrentDirection: function(dir) {
    model.currentDirection = dir;
  }
};

$(document).ready(function() {
  controller.init();
});
