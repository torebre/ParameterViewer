import {IBackend} from "./IBackend";
import {ParameterInfo} from "./ParameterInfo";
import {Injectable} from "angular2/core";
import {DummyBackend} from "./DummyBackend";



@Injectable()
export class Backend implements IBackend {
    private backend:IBackend = new DummyBackend();

    
    constructor() {

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
    
    getParameters():Array<ParameterInfo> {
        return this.backend.getParameters();
    }

}