import {IBackend} from "./IBackend";
import {ParameterInfo} from "./ParameterInfo";


export class DummyBackend implements IBackend {
    
    getValue(parameter:number, start:number, stop:number):ValueSummary {
        return undefined;
    }

    getBlockLengthfunction():number {
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

