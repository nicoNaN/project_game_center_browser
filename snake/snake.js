"use strict";

var view = {
  init: function() {
    this.attachDirListener();
    setInterval(function() {
      view.render();
    }, 500);
  },

  render: function() {
    this.clearField();
    this.drawBoard();
    this.placeFood();
    var totalScore = model.getScore();
    $("#score").text(totalScore);
    this.drawSnake(model.getCurrentDirection());
  },

  clearField: function() {
    $('#snake-grid').html("")
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
    $("div[data-y='" + model.foodLoc.y + "'] div[data-x='" + model.foodLoc.x + "']").addClass( 'food' );
  },

  randomizeFoodLoc: function() {
    var randx = Math.floor((Math.random() * 10 ) + 1);
    var randy = Math.floor((Math.random() * 10 ) + 1);


    return { x: randx, y: randy };
  },

  clearFood: function() {
    $('.food').removeClass('food');
  },

  drawSnake: function(direction) {
    model.snakeBody.push($.extend({}, model.snakeHead));

    model.makeMove(direction);

    if (model.ateFood()) {
      view.clearFood();
      model.foodLoc = view.randomizeFoodLoc();
      model.totalScore++;
      view.placeFood();
    } else {
      model.snakeBody.shift();
    }

    $("div[data-y='" + model.snakeHead.y + "'] div[data-x='" + model.snakeHead.x + "']").addClass( 'snake' );
    model.snakeBody.forEach(function(section){
      $("div[data-y='" + section.y + "'] div[data-x='" + section.x + "']").addClass( 'snake' );
    });

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

  snakeBody: [],

  snakeHead: {
    x: 1,
    y: 10
  },

  foodLoc: {
    x: 1,
    y: 3
  },

  currentDirection: "up",

  gridSize: 10,
  totalScore: 0,

  moveUp: function() {
    this.snakeHead.y--;
  },

  moveDown: function() {
    this.snakeHead.y++;
  },

  moveLeft: function() {
    this.snakeHead.x--;
  },

  moveRight: function() {
    this.snakeHead.x++;
  },

  makeMove: function(direction) {
    if (direction == "up") {
      this.moveUp();
    } else if (direction == "down") {
      this.moveDown();
    } else if (direction == "left") {
      this.moveLeft();
    } else if (direction == "right") {
      this.moveRight();
    };
  },

  ateFood: function() {
    var foodCoords = JSON.stringify({ x: model.foodLoc.x, y: model.foodLoc.y });
    var snakeCoords = JSON.stringify(model.snakeHead);
    return snakeCoords == foodCoords;
  },

  getScore: function() {
    return this.totalScore;
  },

  getCurrentDirection: function() {
    return this.currentDirection;
  },

  getSnakeX: function() {
    return this.snakeHead.x;
  },

  getSnakeY: function() {
    return this.snakeHead.y;
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
