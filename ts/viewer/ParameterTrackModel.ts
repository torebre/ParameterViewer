

class ParameterTrackModel {
    private parameterTrack:ParameterTrack;


    constructor(private parameter:number, private dataModel:DataModel) {
        this.dataModel = dataModel;
        this.graphColumn = undefined;
        dataModel.addListener(this);
    }


    // Returns an array with parameter value objects
    getParameterPath():Array<ValueSummary> {
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

    setParameterTrack(parameterTrack:ParameterTrack) {
        this.parameterTrack = parameterTrack;
    }

    //getRange() {
    //    return {
    //        min: this.dataModel.getMin(parameter),
    //        max: this.dataModel.getMax(parameter)
    //    };
    //}

    getMin():number {
        return this.dataModel.getMin(this.parameter);
    }

    getMax():number {
        return this.dataModel.getMax(this.parameter);
    }

    updateMarkerLine(yCoord:number):void {
        this.parameterTrack.drawMarkerLine(yCoord);
    }

}
