import {IBackend} from "./IBackend";



export class Backend implements IBackend {

    constructor(private backend:IBackend) {

    }


    getBlockLengthfunction():number {
        return this.backend.getBlockLengthfunction();
    }

    getRangeStart():number {
        return this.backend.getRangeStart();
    }

    getBlockIndices(rangeStart:number, rangeEnd:number):number {
        return this.backend.getBlockIndices(rangeStart, rangeEnd);
    }

    getRangeEnd():number {
        return this.backend.getRangeEnd();
    }

    getMin(parameter:number):number {
        return this.backend.getMax(parameter);
    }

    getMax(parameter:number):number {
        return this.backend.getMax(parameter);
    }

    getValue(parameter:number, start:number, stop:number):ValueSummary {
        return this.backend.getValue(parameter, start, stop);
    }

}