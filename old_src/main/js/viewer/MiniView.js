var $ = require('jquery');

module.exports = (function() {

  function MiniView(paper) {
    // this.init();
    this.paper = paper;

    var outline = paper.rect(0, 0, 100, 800);

    var miniViewWindow = paper.rect(0, 0, 100, 100);
    // miniViewWindow.node.setAttribute('class', "miniViewWindow");
    //miniViewWindow.node.className += " miniViewWindow";
    $(miniViewWindow.node).attr("class", "mediumBold");
    // miniViewWindow.attr('fill', 'red');


    var dragging = false;

    miniViewWindow.drag(
      function() {
        console.log("Moving");
        console.log("Event: " +event.movementY);
        if(dragging && event.movementY != 0) {
        // TODO Do not allow the user to drag the miniview outside the outline
          // miniViewWindow.transform("t0," +event.movementY);
        // miniViewWindow.translate(0, event.movementY);
        console.log("miniViewWindow.x: " +miniViewWindow.y +". event.movementY: " +event.movementY);
        miniViewWindow.attr('y', miniViewWindow.attr('y') + event.movementY);
      }
      },
      function() {
        console.log("Starting");
        dragging = true;
      },
      function() {
        console.log("Stopping");
        dragging = false;
      }
    )


  }


  MiniView.prototype = {
    // init: function() {
    //
    //
    // }

  }


  return MiniView;
})();
