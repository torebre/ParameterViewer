import {ParameterInfo} from "./ParameterInfo";
import {ParameterUpdateListener} from "./ParameterUpdateListener";
import {ValueSummary} from "../viewer/ValueSummary";


export interface IBackend {

    getBlockLength():number

    getRangeStart():number

    getBlockIndices(rangeStart:number, rangeEnd:number):number

    getRangeEnd():number

    getMin(parameter:number):number

    getMax(parameter:number):number

// Calculates the minimum, maximum and average for the
// parameter within the range [start, stop]. The start
// and stop values are integers that represent a range
// of index points
    getValue(parameter:number, start:number, stop:number):ValueSummary

    getParameters():Array<ParameterInfo>

}
