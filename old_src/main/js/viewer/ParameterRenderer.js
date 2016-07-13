/*
Determines how the parameter value is drawn on the x-axis.


*/


module.exports = (function() {
  function ParameterRenderer(width) {
    this.init(width);

  }


  ParameterRenderer.prototype = {
    init: function(init) {
      this.init = init;
    }

  }


  return ParameterRenderer;
})();
