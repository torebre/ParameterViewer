import {IBackend} from "./IBackend";
import {ParameterInfo} from "./ParameterInfo";
import {Injectable, Inject} from "angular2/core";
import {DummyBackend} from "./DummyBackend";
import {ParameterUpdateListener} from "./ParameterUpdateListener";
import {SocketHandler} from "./SocketHandler";
import {APP_CONFIG, Config} from "../Config";


@Injectable()
export class Backend implements IBackend {
    private backend:IBackend = new DummyBackend();
    private websocketConnection:SocketHandler;


    constructor(@Inject(APP_CONFIG) private config:Config) {
        
        console.log("Web socket end point: " +config.WEB_SOCKET_ENDPOINT);
        
        this.websocketConnection = new SocketHandler(config.WEB_SOCKET_ENDPOINT);
// this.websocketConnection.connect();
        
        this.websocketConnection.getDataStream().subscribe(data => {
           console.log("Got data: " +data[1]);
        },
        error => {
            console.log("Error");
        });
    }


    getBlockLengthfunction():number {
        return this.backend.getBlockLength();
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

    getBlockLength():number {
        return undefined;
    }

    attachParameterUpdateCallback(parameterUpdateListener:ParameterUpdateListener):void {
    }

    removeParameterUpdateCallback(parameterUpdateListner:ParameterUpdateListener):void {
    }


}