System.register([], function(exports_1) {
    var ParameterTrackModel;
    return {
        setters:[],
        execute: function() {
            ParameterTrackModel = (function () {
                function ParameterTrackModel(parameter, dataModel) {
                    this.parameter = parameter;
                    this.dataModel = dataModel;
                    this.dataModel = dataModel;
                    dataModel.addListener(this);
                }
                ParameterTrackModel.prototype.getParameterPath = function () {
                    return this.dataModel.getValuesForParameter(this.parameter);
                };
                ParameterTrackModel.prototype.rangeChanged = function () {
                    this.fireRender();
                };
                ParameterTrackModel.prototype.layoutChanged = function () {
                    this.fireRender();
                };
                ParameterTrackModel.prototype.fireRender = function () {
                    for (var listener in this.listeners) {
                        listener.render();
                    }
                };
                ParameterTrackModel.prototype.getParameter = function () {
                    return this.parameter;
                };
                ParameterTrackModel.prototype.getMin = function () {
                    return this.dataModel.getMin(this.parameter);
                };
                ParameterTrackModel.prototype.getMax = function () {
                    return this.dataModel.getMax(this.parameter);
                };
                ParameterTrackModel.prototype.updateMarkerLine = function (yCoord) {
                    for (var listener in this.listeners) {
                        listener.updateMarkerLine(yCoord);
                    }
                };
                ParameterTrackModel.prototype.addListener = function (parameterTrack) {
                    this.listeners.push(parameterTrack);
                };
                return ParameterTrackModel;
            })();
        }
    }
});
//# sourceMappingURL=ParameterTrackModel.js.map