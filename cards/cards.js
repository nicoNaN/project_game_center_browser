"use strict";

var view = {
  init: function() {
    while(model.gridSize % 2 == 1) {
      model.gridSize = prompt("Enter an EVEN number to begin!", "4");
    }

    $("#card-grid").on('click', '.card', (function() {
      controller.parseClick(this);
    }));

    this.render();
  },

  render: function() {
    var totalScore = controller.getScore();
    $("#score").text(totalScore);
    this.drawCards(model.gridSize);
  },

  drawCards: function(numCards) {
    for (var i = 0; i < numCards; i++) {
      this.addRow($("#card-grid"), model.gridSize);
    }
  },

  insertCardVals: function(cardVals) {
    var $cards = $(".card");

    $cards.each(function() {
      var val = cardVals.pop();
      $(this).html("<div class='value'>" + val + "</div>");
    });
  },

  addRow: function(cardGrid, numColumns) {
    cardGrid.append("<div class='row'></div>");
    for (var i = 0; i < numColumns; i++) {
      $("#card-grid .row").last().append("<div class='card face-down'></div>");
    }
  }
};

var model = {
  gridSize: 1,
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
    view.insertCardVals(model.createCardVals());
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
