"use strict";

var view = {
  init: function() {
    this.render();
  },

  render: function() {
    var totalScore = controller.getScore();
    $("#score").text(totalScore);
    this.drawBoard();
    this.placeFood();
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
  }
};

var model = {
  gridSize: 10,
  totalScore: 0,

  getScore: function() {
    return this.totalScore;
  },

  totalCards: function() {
    return model.gridSize * model.gridSize;
  },

  createCardVals: function() {
    return model.shuffle(model.generateVals());
  },

  generateVals: function() {
    var arr = [];
    var pairs = model.totalCards() / 2;

    for (var i = 0; i < pairs; i++) {
      var num = Math.floor((Math.random() * 50 ) + 1);
      arr.push(num);
      arr.push(num);
    }

    return arr;
  },

  shuffle: function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
};

var controller = {
  init: function() {
    view.init();
  },

  getScore: function() {
    return model.getScore();
  },

  parseClick: function(card) {
    var faceUp = $(".face-up").length;

    if (faceUp < 2) {
      $(card).addClass('face-up').removeClass('face-down');
    } else if (faceUp == 2) {
      var $visibleCards = $('.face-up');

      if ($visibleCards.first().text() == $visibleCards.last().text()) {
        $visibleCards.each(function() {
          $(this).addClass('match').removeClass('face-up').off('click');
        });
        model.totalScore++;
        $("#score").text(model.totalScore);
      } else {
        setTimeout(function() {
          $visibleCards.each(function() {
            $(this).removeClass('face-up');
          });
        }, 1000);
      }
    }
  }
};

$(document).ready(function() {
  controller.init();
});
