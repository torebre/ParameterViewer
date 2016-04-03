import {Component} from "angular2/core";
import {ParameterTable} from "./ParameterTable";
import {ParameterList} from "./ParameterList";
import {Backend} from "../backend/Backend"


@Component({
    selector: "parameter-viewer",
    templateUrl: "viewer/parameterViewer.html",
    directives: [ParameterTable, ParameterList],
    providers: [Backend]
})
export class ParameterViewer {


    constructor(private backend:Backend) {


    }






}