import {Component} from "angular2/core";
import {ParameterTable} from "./ParameterTable";
import {ParameterList} from "./ParameterList";
import {Backend} from "../backend/Backend"


/**
 * This is the top level component for the application.
 * 
 */
@Component({
    selector: "parameter-viewer",
    templateUrl: "templates/parameterViewer.html",
    directives: [ParameterTable, ParameterList],
    providers: [Backend]
})
export class ParameterViewer {
    

    constructor() {

    }
    



}