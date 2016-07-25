import {IBackend} from "./IBackend";
import {ParameterInfo} from "./ParameterInfo";
import {Injectable, Inject} from "@angular/core";
import {DummyBackend} from "./DummyBackend";
import {ParameterUpdateListener} from "./ParameterUpdateListener";
import {SocketHandler} from "./SocketHandler";
import {APP_CONFIG, Config} from "../Config";
import {ValueSummary} from "../viewer/ValueSummary";
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Rx";


@Injectable()
export class Backend implements IBackend {
  private backend:IBackend = new DummyBackend();
  private websocketConnection:SocketHandler;

  private actionUrl:string;
  private headers:Headers;


  constructor(@Inject(APP_CONFIG) private config:Config, private http:Http) {
    // this.websocketConnection = new SocketHandler(config.WEB_SOCKET_ENDPOINT);
    // this.websocketConnection.connect();
    //
    // this.websocketConnection.getDataStream().subscribe(data => {
    //         console.log("Got data from: " + data.origin);
    //         console.log("Message data: " + data.data);
    //     },
    //     error => {
    //         console.log("Error");
    //     });

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
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

  getValues(logId:number, parameterId:number, start:number, stop:number):Observable<Array<number>> {
    let params:URLSearchParams = new URLSearchParams();

    // TODO Just here for testing
    params.set('start', '0');
    params.set('stop', '100');

    return this.http.get(this.config.REST_BASE_ENDPOINT + "/parameters/" + logId + "/" + parameterId + "/values",
      {
        search: params
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res:Response):number[] {
    let body = res.text();

    var values:string[] = body.split(",");
    var result:number[] = [];
    var value;
    for (value in values) {
      var parsedValue = parseFloat(values[value]);

      // TODO Just set up like this for testing

      if(isNaN(parsedValue)) {
        result.push(0.0);
      }
      else {
        result.push(parsedValue);
      }

    }

    return result;
  }


  private handleError(error:any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


}
