import {ParameterTrack} from "../viewer/ParameterTrack";


export interface IParameterTrackModel {

    updateMarkerLine(yCoord:number):void;

    getParameter():number;

    getParameterName():string;

    getMin():number;

    getMax():number;

    getParameterPath():Array<ValueSummary>;

    render():void;

    addListener(parameterTrack:ParameterTrack):void;

}