import {PaintManager} from "../../viewer/PaintManager";
import {IBackend} from "../../backend/IBackend";
import {ParameterInfo} from "../../backend/ParameterInfo";
import {ParameterUpdateListener} from "../../backend/ParameterUpdateListener";



class MockBackend implements IBackend {
    getBlockLength():number {
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

    getValue(parameter:number, start:number, stop:number):ValueSummary {
        return undefined;
    }

    getParameters():Array<ParameterInfo> {
        return undefined;
    }

    attachParameterUpdateCallback(parameterUpdateListener:ParameterUpdateListener):void {
    }

    removeParameterUpdateCallback(parameterUpdateListner:ParameterUpdateListener):void {
    }


}


describe("PaintManager unit test", () => {
    var paintManager:PaintManager;


    beforeEach(() => {
        var mockBackend = new MockBackend();
        paintManager = new PaintManager(mockBackend);

    });


});


it("Calculate SVG path", () => {


});