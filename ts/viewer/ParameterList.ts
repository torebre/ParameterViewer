import {Component} from "angular2/core";
import IBackend = Backend.IBackend;


@Component({
    selector: "parameter-list",
    templateUrl: "templates/parameterList.html",
    providers: [IBackend]
})
class ParameterList {


    constructor(private backend:IBackend) {



    }



}