import {ValueSummary} from "../viewer/ValueSummary";


export interface IParameterTrackModel {

    updateMarkerLine(yCoord:number):void;

    getParameter():number;

    getParameterName():string;

    getMin():number;

    getMax():number;

    getParameterPath():Array<ValueSummary>;

    render():void;

}
