module.exports = (function() {
  function ParameterTrackModel(parameter, dataModel) {
    this.parameter = parameter;
    this.dataModel = dataModel;
    this.graphColumn = undefined;
    dataModel.addListener(this);

    // Returns an array with parameter value objects
    this.getParameterPath = function() {
      return this.dataModel.getValuesForParameter(this.parameter);
    };

    this.rangeChanged = function() {
      this.parameterTrack.render();
    };

    this.getParameter = function() {
      return this.parameter;
    };

    this.setParameterTrack = function(parameterTrack) {
      this.parameterTrack = parameterTrack;
    };

    this.getRange = function() {
      return {
        min: this.dataModel.getMin(parameter),
        max: this.dataModel.getMax(parameter)
      };
    };

  };

  return ParameterTrackModel;
})();
