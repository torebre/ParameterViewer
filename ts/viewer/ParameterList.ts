import {Component} from "angular2/core";
import {IBackend} from "../backend/IBackend";


// TODO Figure out what the provider should be


@Component({
    selector: "parameter-list",
    templateUrl: "templates/parameterList.html",
    providers: [IBackend]
})
export class ParameterList {

    constructor(private backend:IBackend) {

    }



}