import {Component} from "angular2/core";
import {Backend} from "../backend/Backend";


// TODO Figure out what the provider should be


@Component({
    selector: "parameter-list",
    templateUrl: "templates/parameterList.html",
    providers: [Backend]
})
export class ParameterList {

    constructor(private backend:Backend) {

    }



}