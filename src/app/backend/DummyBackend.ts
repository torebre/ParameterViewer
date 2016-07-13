import {IBackend} from "./IBackend";
import {ParameterInfo} from "./ParameterInfo";
import {ParameterUpdateListener} from "./ParameterUpdateListener";
import {ValueSummary} from "../viewer/ValueSummary";


export class DummyBackend implements IBackend {
    getBlockLength():number {
        return undefined;
    }

    attachParameterUpdateCallback(parameterUpdateListener:ParameterUpdateListener):void {
    }

    removeParameterUpdateCallback(parameterUpdateListner:ParameterUpdateListener):void {
    }

    getValue(parameter:number, start:number, stop:number):ValueSummary {
        return undefined;
    }

    getRangeStart():number {
        return undefined;
    }

    getBlockIndices(rangeStart:number, rangeEnd:number):number {
        return undefined;
    }

    getRangeEnd():number {
        return undefined;
    }

    getMin(parameter:number):number {
        return undefined;
    }

    getMax(parameter:number):number {
        return undefined;
    }

    getParameters():Array<ParameterInfo> {
        return [new ParameterInfo("Test1", "unit1"), new ParameterInfo("Test2", "unit2"), new ParameterInfo("Test3", "unit3")];
    }


}

