

import {listeners} from "cluster";
class ParameterTrackModel {
    private listeners:ParameterTrackModelListener[];


    constructor(private parameter:number, private dataModel:DataModel) {
        this.dataModel = dataModel;
        dataModel.addListener(this);
    }

    // Returns an array with parameter value objects
    getParameterPath():Array<ValueSummary> {
        return this.dataModel.getValuesForParameter(this.parameter);
    }

    rangeChanged():void {
        this.fireRender()
    }

    layoutChanged():void {
        this.fireRender();
    }

    private fireRender():void {
        for(let listener in this.listeners) {
            listener.render();
        }
    }


    getParameter() {
        return this.parameter;
    }

    getMin():number {
        return this.dataModel.getMin(this.parameter);
    }

    getMax():number {
        return this.dataModel.getMax(this.parameter);
    }

    updateMarkerLine(yCoord:number):void {
        for(let listener in this.listeners) {
            listener.updateMarkerLine(yCoord);
        }
    }

    addListener(parameterTrack:ParameterTrackModelListener):void {
        this.listeners.push(parameterTrack);
    }

}
