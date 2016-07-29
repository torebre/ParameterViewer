import {IBackend} from "./IBackend";
import {ParameterInfo} from "./ParameterInfo";
import {Injectable, Inject} from "@angular/core";
import {DummyBackend} from "./DummyBackend";
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

  getValues(logId:number, parameterId:number, start:number, stop:number):Observable<Array<number>> {
    let params:URLSearchParams = new URLSearchParams();

    // TODO Just here for testing
    params.set('start', start.toString());
    params.set('stop', stop.toString());

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

      if (isNaN(parsedValue)) {
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


  getValueSummary(logId:number, parameterId:number, rangesStart:number[], rangesStop:number[]):Observable<Array<number>> {
    let params:URLSearchParams = new URLSearchParams();

    var rangesCopy:number[] = [];
    var numberRange:number[] = rangesStart.slice();

    for (index in rangesStart) {
      if (rangesStart[index] != -1) {
        rangesCopy.push(rangesStart[index], rangesStop[index]);
      }
    }

    // TODO Just here for testing
    var index;

    console.log("Ranges in request: " + rangesCopy);
    for (index in rangesCopy) {
      params.append('ranges', rangesCopy[index].toString());
    }

    return this.http.get(this.config.REST_BASE_ENDPOINT + "/parameters/" + logId + "/" + parameterId + "/valueSummary",
      {
        search: params
      })
      .map(result => {
        var rangesSummary = this.extractDataSummary(result);
        var counter:number = 0;
        for (index in numberRange) {
          if (numberRange[index] != -1) {
            numberRange[index] = rangesSummary[counter++];
          }
          else {
            numberRange[index] = NaN;
          }
          // else {
          //   // TODO Use some other values
          //   numberRange.push(-1);
          // }
        }
        return numberRange;
      })
      .catch(this.handleError);
  }

  private extractDataSummary(res:Response):number[] {
    let body = res.json();

    var result:number[] = [];
    var index;
    for (index in body) {
      var parsedValue = parseFloat(body[index].average);

      // TODO Just set up like this for testing

      if (isNaN(parsedValue)) {
        result.push(0.0);
      }
      else {
        result.push(parsedValue);
      }
    }
    return result;
  }

  getIndexRange(logId:number):Observable<Array<number>> {
    return this.http.get(this.config.REST_BASE_ENDPOINT + "/indexRange/" + logId)
      .map(result => {
        var body = result.json();
        return [body.start, body.stop];
      })
      .catch(this.handleError);
  }

}
