///<reference path="DataModel.ts"/>
import {Component} from "angular2/core";
import {ParameterTable} from "./ParameterTable.js";




@Component({
    selector: "parameter-viewer",
    providers: [IBackend],
    templateUrl: "viewer/parameterViewer.html",
    directives: [ParameterTable]
})
class ParameterViewer {


    constructor(private backend:IBackend) {


    }






}