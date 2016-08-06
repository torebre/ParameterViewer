import {DataModel} from "./DataModel"
import {IParameterTrackModel} from "../backend/IParameterTrackModel";
import {ValueSummary} from "./ValueSummary";


export class ParameterTrackModel implements IParameterTrackModel {

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
        // for (let listener in this.listeners) {
        //     listener.render();
        // }
    }

    getParameter():number {
        return this.parameter;
    }

    getParameterName():string {
        // TODO Figure out how to get name
        return "";
    }

    getMin():number {
        return this.dataModel.getMin(this.parameter);
    }

    getMax():number {
        return this.dataModel.getMax(this.parameter);
    }

    updateMarkerLine(yCoord:number):void {
        // for (let listener in this.listeners) {
        //     listener.updateMarkerLine(yCoord);
        // }
    }

    render():void {
        // TODO Implement method
    }


}
