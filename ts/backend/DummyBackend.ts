import {IBackend} from "./IBackend";


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

}

