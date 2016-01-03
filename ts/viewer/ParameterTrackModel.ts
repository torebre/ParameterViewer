
class ParameterTrackModel {


    constructor(parameter, dataModel) {
        this.parameter = parameter;
        this.dataModel = dataModel;
        this.graphColumn = undefined;
        dataModel.addListener(this);
    }


    // Returns an array with parameter value objects
    getParameterPath() {
        return this.dataModel.getValuesForParameter(this.parameter);
    }

    rangeChanged() {
        this.parameterTrack.render();
    }

    layoutChanged() {
        this.parameterTrack.render();
    }

    render = function() {
        this.parameterTrack.render();
    }

    getParameter() {
        return this.parameter;
    }

    setParameterTrack(parameterTrack) {
        this.parameterTrack = parameterTrack;
    }

    getRange() {
        return {
            min: this.dataModel.getMin(parameter),
            max: this.dataModel.getMax(parameter)
        };
    }

    updateMarkerLine(yCoord) {
        this.parameterTrack.drawMarkerLine(yCoord);
    }

}
