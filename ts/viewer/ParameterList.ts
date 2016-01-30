import {Component} from "angular2/core";
import IBackend = Backend.IBackend;
//import {IBackend} from "../backend/Backend";


// TODO Figure out what the provider should be


@Component({
    selector: "parameter-list",
    templateUrl: "templates/parameterList.html",
    providers: [Backend]
})
class ParameterList {


    constructor(private backend:IBackend) {



    }



}